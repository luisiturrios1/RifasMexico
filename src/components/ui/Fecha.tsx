import moment from 'moment'
import { TextStyle } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import 'moment/locale/es'

// Configura el idioma globalmente
moment.locale('es')

interface FechaProps {
  fecha?: string | Date | undefined
  format?: string
  style?: TextStyle | TextStyle[]
}

export const Fecha = ({
  fecha,
  format = 'D [de] MMMM',
  style = {}
}: FechaProps) => {
  if (!fecha || !moment(fecha).isValid()) {
    return <ThemedText style={style}>...</ThemedText>
  }

  const formattedDate = moment(fecha).format(format)

  return <ThemedText style={style}>{formattedDate}</ThemedText>
}
