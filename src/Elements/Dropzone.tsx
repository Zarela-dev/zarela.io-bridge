import Image from 'next/image'
import { SxStyleProp } from 'rebass'
import { useDropzone } from 'react-dropzone'
import { Box } from 'rebass/styled-components'
import { Text } from './Typography'
import trashIcon from '../../public/images/icons/trash-file.svg'
import { FormikErrors } from 'formik'

const Dropzone = ({
  files,
  setFiles,
  error,
  sx,
}: {
  files: File[]
  error?: string | FormikErrors<File>
  setFiles: (files: File[]) => void
  sx?: SxStyleProp
}) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: '.zip',
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles)
    },
  })

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(81, 74, 92, 0.4)',
          borderWidth: 1,
          borderRadius: 2,
          borderColor: isDragAccept || isDragReject ? 'success.main' : 'other.border',
          borderStyle: 'dashed',
          width: '100%',
          minHeight: 140,
          transition: 'border .24s ease-in-out',
          marginBottom: 5,
          cursor: 'pointer',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Text
          variant={['typography.labelLarge', 'typography.labelLarge', 'typography.labelMedium']}
          color="content.800"
          mb={1}
        >
          Upload File
        </Text>
        <Text variant="typography.labelSmall" color="content.700">
          Accepted format: ZIP
        </Text>
      </Box>
      {error && (
        <Text variant="typography.labelSmall" color="danger.main" mt={-4} mb={4} ml={4}>
          {error}
        </Text>
      )}
      {files.length ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {files.map((file) => (
            <Box
              key={file.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                backgroundColor: 'background.other',
                borderRadius: 3,
                flex: ['0 0 100%', '0 0 186px'],
                padding: 4,
                marginRight: 4,
                marginBottom: 4,
              }}
            >
              <Text
                variant="typography.labelSmall"
                color="content.700"
                mb={1}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {file.name}
              </Text>
              <Box
                sx={{ flex: '0 0 16px', cursor: 'pointer' }}
                onClick={() => {
                  setFiles(files.filter((f) => f.name !== file.name))
                }}
              >
                <Image src={trashIcon} alt="trash" layout="fixed" width={16} height={18} />
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}

export default Dropzone
