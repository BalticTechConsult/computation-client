import { eProtocolVersion } from '@/consts'

/**
* Check if the given value is a eProtocolVersion.
* @param {any} protocolVersion - protocolVersion to check
* @returns {boolean}
*/
export const isProtocolVersion = (protocolVersion: any): protocolVersion is eProtocolVersion =>
  Object.values(eProtocolVersion).includes(protocolVersion)
