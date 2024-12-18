import moment from 'moment';
import 'moment/locale/es';
import { TextStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";

// Configura el idioma globalmente
moment.locale('es');

interface FechaProps {
  fecha?: string;
  style?: TextStyle | TextStyle[];
}

export const Fecha = ({ fecha, style = {} }: FechaProps) => {
  if (!fecha || !moment(fecha).isValid()) {
    return <ThemedText style={style}>...</ThemedText>;
  }

  const formattedDate = moment(fecha).format("D [de] MMMM");

  return <ThemedText style={style}>{formattedDate}</ThemedText>;
};
