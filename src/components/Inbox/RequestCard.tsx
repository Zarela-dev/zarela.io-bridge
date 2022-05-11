import { Box, Flex } from 'rebass/styled-components'
import { Card } from '../../Elements/Card'
import { Icon } from '../../Elements/Icon'
import { Text } from '../../Elements/Typography'
import biobitSymbol from '../../../public/images/icons/BBIT.svg'
import ContributesTable from './ContributesTable'

const InfoBox = ({ title, icon, value, ...props }) => {
  return (
    <Flex flexDirection={'column'} {...props}>
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

const RequestCard = ({ request }) => {
  return (
    <Card variant="card.other" sx={{ width: '100%', marginBottom: 4 }}>
      <Flex width={'100%'} flexDirection="row" flexWrap={'wrap'}>
        <Flex flex="0 0 100%" flexWrap={'nowrap'}>
          <Box
            sx={{
              backgroundColor: 'darkTheme.400',
              borderRadius: 32,
              padding: 2,
              height: 32,
              minWidth: 32,
              marginRight: 2,
              flex: '0 0 auto',
            }}
          >
            <Text>{request.requestID}</Text>
          </Box>
          <Text fontSize="bodyMedium" color="content.900">
            {request.title}
          </Text>
        </Flex>
        <Box
          sx={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'other.border',
            borderBottomStyle: 'solid',
            marginTop: 4,
            marginBottom: 4,
          }}
        ></Box>
        <Flex width={'100%'}>
          <InfoBox title={'Total Reward'} icon={biobitSymbol} value={20} mr={7} />
          <InfoBox title={'Total Reward'} icon={biobitSymbol} value={20} />
        </Flex>
        <ContributesTable request={request} />
      </Flex>
    </Card>
  )
}

export default RequestCard
