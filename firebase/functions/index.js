const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.actializarRifa = functions.firestore.onDocumentWritten(
  "rifas/{rifaId}/ratings/{ratingId}",
  async (event) => {
    const rifaId = event.params.rifaId;
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();

    let ratingChange = 0;
    let ratingCountChange = 0;

    if (!beforeData && afterData) {
      // Documento creado
      ratingChange = afterData.rating || 0;
      ratingCountChange = 1;
    } else if (beforeData && !afterData) {
      // Documento eliminado
      ratingChange = -(beforeData.rating || 0);
      ratingCountChange = -1;
    } else if (beforeData && afterData) {
      // Documento actualizado
      ratingChange = (afterData.rating || 0) - (beforeData.rating || 0);
      ratingCountChange = 0;
    }
    try {
      const rifaRef = admin.firestore().collection("rifas").doc(rifaId);
      const rifaDoc = await rifaRef.get();
      const rifaData = rifaDoc.data();

      const currentRating = rifaData.rating || 0;
      const currentReviews = rifaData.reviews || 0;
      const newTotalReviews = currentReviews + ratingCountChange;

      const newRating =
        newTotalReviews > 0
          ? (currentRating * currentReviews + ratingChange) / newTotalReviews
          : 0;

      await rifaRef.update({
        rating: newRating,
        reviews: Math.max(newTotalReviews, 0),
      });

      logger.log(`Rifa ${rifaId} actualizada`);
    } catch (error) {
      logger.error(`Error al actualizar la rifa ${rifaId}:`, error);
    }

    return null;
  }
);
