import React from 'react'
import { Contract, Abi, hash, stark, number } from 'starknet'
// import { getSelectorFromName } from 'starknet/dist/utils/stark';

//
// Parser recommended at https://stackoverflow.com/a/52960008
//
import Parser from 'html-react-parser'

//
// Function to retrieve felt array from contract and stringify
//
export function CallContractStringifyReturn(contract: Contract | undefined, method: string): string | undefined {
  const [ret, setRet] = React.useState<string | undefined>(undefined)

  const entrypointSelector = hash.getSelectorFromName(method)
  const calldata = stark.compileCalldata({})

  const callRet = React.useCallback(async () => {
    if (contract && contract.connectedTo) {
      contract.provider
        .callContract({
          contract_address: contract.connectedTo,
          calldata,
          entry_point_selector: entrypointSelector,
        })
        .then((res) => {
          let recovered_string = ''
          const hexstr_array = res.result.slice(1)
          for (let i = 0; i < hexstr_array.length; i++) {
            const str = hexstr_array[i].slice(2)
            const bytes = hexToBytes(str)
            const s = bin2String(bytes)
            recovered_string += s
          }
          setRet(recovered_string)
        })
    } else {
      setRet(undefined)
    }
  }, [contract, calldata, entrypointSelector])

  React.useEffect(() => {
    callRet()
  }, [callRet])

  return ret
}

//
// Utility functions below for parsing starknet contract return values
// TODO: move the functions below to separate files / publish them as library
//

// https://stackoverflow.com/questions/61272872/how-to-render-svg-string-as-image-in-react
// tl;dr btoa() does the work
export function svgStringToBase64(str: string | undefined) {
  if (str) {
    // str = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><polygon fill="#75bcb2" points="110.62 149.06 102.63 10.94 51.62 42.59 110.62 149.06"><animate id="shape1" attributeName="points" to="85.43 103.6 147.1 18.21 19.97 103.6 85.43 103.6" dur="5s" fill="freeze" begin="0s; shape_og.end"/><animate id="shape2" attributeName="points" to="107.99 103.6 147.1 67.19 17.8 33.87 107.99 103.6" dur="5s" fill="freeze" begin="shape1.end"/><animate id="shape_og" attributeName="points" to="110.62 149.06 102.63 10.94 51.62 42.59 110.62 149.06" dur="5s" fill="freeze" begin="shape2.end"/><animate id="color1" begin="0s; color_og.end" fill="freeze" attributeName="fill" dur="5s" to="#dce4ef"></animate><animate id="color2" begin="color1.end" fill="freeze" attributeName="fill" dur="5s" to="#8661c1"></animate><animate id="color_og" begin="color2.end" fill="freeze" attributeName="fill" dur="5s" to="#75bcb2"></animate></polygon></svg>`
    return btoa(str)
  } else {
    return undefined
  }
}

export function htmlParse(str: string | undefined) {
  if (str) {
    return Parser(str)
  } else {
    return undefined
  }
}

// https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
function hexToBytes(hex: string) {
  const bytes: Array<number> = []
  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))
  return bytes
}

// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
function bin2String(array: number[]) {
  let result = ''
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i].toString(2), 2))
  }
  return result
}
