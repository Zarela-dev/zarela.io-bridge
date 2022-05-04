export const validateNetwork = (network: number | string | undefined) => {
  return Number(network) === Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)
}
