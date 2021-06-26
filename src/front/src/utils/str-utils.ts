import { v4 as uuidv4 } from 'uuid'
import _isEmpty from 'lodash/isEmpty'
export const getUUID = (): string => uuidv4().replace(/[^a-z]/i, '') // replace the first char if it's a number
export const strtolower = (str: string): string => str.toLowerCase()
/* eslint-disable-next-line */
export const isEmpty = (str: any): boolean => _isEmpty(str)
export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(','),
    // @ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1])

  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
