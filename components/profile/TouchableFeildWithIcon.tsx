import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { TouchableFeildWithIconProps } from '@/types/type'

const TouchableFeildWithIcon = ({
    icon,
    title,
    pathName,
} : TouchableFeildWithIconProps) => {
  return (
    <TouchableOpacity className='flex flex-row-reverse w-full items-center justify-start border-b pb-5 pt-3' onPress={() => {pathName}}>
      <Image 
        source={icon}
        resizeMode="contain"
        className="w-7 h-7"
      />
      <Text className='pr-4 '>{title}</Text>
    </TouchableOpacity>
  )
}

export default TouchableFeildWithIcon