import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";

export const updateRifas = functions.scheduler.onSchedule(
  "every 1 hours",
  async (event): Promise<void> => {
    const db = admin.firestore();

    logger.info("Iniciando la actualización de rifas...");

    try {
      const rifasRef = db.collection("rifas");
      const snapshot = await rifasRef.where("autoUpdate", "==", true).get();

      logger.log("Documentos a actualizar", snapshot.size);

      if (snapshot.empty) {
        logger.info(
          "No se encontraron más documentos en la colección 'rifas'."
        );
        return;
      }

      // Procesar los documentos en paralelo
      const updatePromises = snapshot.docs.map(async (doc) => {
        const rifaData = doc.data();

        if (!rifaData.api) {
          logger.warn(
            `El documento ${doc.id} no tiene el campo "api", se omitirá.`
          );
          return; // Ignorar este documento
        }

        try {
          // Llamada a /cover
          const coverUrl = `${rifaData.api}/cover`;
          logger.debug(`Haciendo solicitud a ${coverUrl}`);
          const coverResponse = await fetch(coverUrl);
          if (!coverResponse.ok) {
            logger.error(
              `Error en /cover para ${doc.id}: ${coverResponse.statusText}`
            );
            return;
          }
          const coverData = await coverResponse.json();

          const { link, imageUrl } = coverData[0];

          const sorteoId: number = +link;

          if (!sorteoId) {
            logger.error(
              `No se pudo obtener el sorteoId para ${doc.id}, se omitirá.`
            );
            return; // Ignorar este documento
          }

          // Llamada a /settings
          const settingsUrl = `${rifaData.api}/settings?raffle=S${sorteoId}Settings`;
          logger.debug(`Haciendo solicitud a ${settingsUrl}`);
          const settingsResponse = await fetch(settingsUrl);
          if (!settingsResponse.ok) {
            logger.error(
              `Error en /settings para ${doc.id}: ${settingsResponse.statusText}`
            );
            return;
          }
          const settingsData = await settingsResponse.json();

          const raffleDate = Timestamp.fromDate(
            new Date(settingsData.raffleDate)
          );

          // Datos para actualizar el documento
          const updatedData: any = {
            ...rifaData,
            sorteoId,
            imageUrl,
            raffleDate,
          };

          logger.info(`Documento ${doc.id} preparado para la actualización.`);
          return { docId: doc.id, updatedData };
        } catch (error) {
          logger.error(`Error procesando el documento ${doc.id}:`, error);
          return; // Ignorar este documento si falla
        }
      });

      // Esperar a que todas las promesas se resuelvan
      const updates = (await Promise.all(updatePromises)).filter(Boolean);

      // Crear un batch para actualizar todos los documentos al mismo tiempo
      const batch = db.batch();
      updates.forEach((data) => {
        if (data) {
          batch.update(rifasRef.doc(data.docId), data.updatedData);
        }
      });

      if (updates.length > 0) {
        await batch.commit();
        logger.info("actualizaciones completado.");
      } else {
        logger.info("No se realizaron actualizaciones.");
      }

      logger.info("Actualización de rifas completada con éxito.");
    } catch (error) {
      logger.error("Error general durante la actualización de rifas:", error);
    }
  }
);
