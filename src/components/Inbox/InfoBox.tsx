import React from 'react'
import { Flex } from 'rebass/styled-components'
import { Icon } from '../../Elements/Icon'
import { Text } from '../../Elements/Typography'

const InfoBox = ({ title, icon, value, ...props }) => {
  return (
    <Flex flexDirection={'column'} alignItems='flex-start' {...props}>
      <Text fontSize="labelSmall" color="content.700" mb={2}>
        {title}
      </Text>
      <Flex alignItems={'center'}>
        <Icon size="small" src={icon} mr={1}></Icon>
        <Text fontSize="labelMedium" color="content.900">
          {value}
        </Text>
      </Flex>
    </Flex>
  )
}

export default InfoBox
