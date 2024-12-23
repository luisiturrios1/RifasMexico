import csv
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from dateutil.parser import parse  # Importamos parse para manejar ISO 8601

# Inicializar Firebase
cred = credentials.Certificate("/Users/luisiturrios/Downloads/rifasmexico-dev-firebase-adminsdk-zgo8v-4ea197f974.json")  # Cambia por la ruta a tu archivo JSON de credenciales
firebase_admin.initialize_app(cred)
db = firestore.client()

def cargar_csv_a_firestore(ruta_csv):
    with open(ruta_csv, newline='', encoding='utf-8') as archivo_csv:
        lector = csv.DictReader(archivo_csv)
        for fila in lector:
            try:
                # Procesar la fila y manejar los campos opcionales
                datos = {}
                datos['nombre'] = fila['nombre']
                datos['sitio'] = fila['sitio']
                datos['website'] = fila['website']
                datos['logo'] = fila['logo']
                datos['facebook'] = fila['facebook']
                datos['api'] = fila['api']
                datos['autoUpdate'] = fila['autoUpdate'].strip().upper() == 'TRUE'
                datos['imageUrl'] = fila['imageUrl']

                # Validar sorteoId
                if fila['sorteoId'].strip():
                    datos['sorteoId'] = int(fila['sorteoId'])

                # Validar raffleDate
                if fila['raffleDate'].strip():
                    datos['raffleDate'] = parse(fila['raffleDate'])  # Maneja ISO 8601 con 'Z'
                else:
                    datos['raffleDate'] = None 
                
                datos['rating'] = 0 

                # Agregar el documento a la colección 'rifas'
                db.collection('rifas').add(datos)
                print(f"Documento agregado: {datos}")
            except Exception as e:
                print(f"Error al procesar la fila {fila}: {e}")

# Llamar a la función con la ruta del archivo CSV
cargar_csv_a_firestore("rifas.csv")  # Cambia por la ruta a tu archivo CSV
