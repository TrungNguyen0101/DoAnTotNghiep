import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Typography = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Headings
          <DocsLink href="https://coreui.io/docs/content/typography/"/>
        </CCardHeader>
        <CCardBody>

        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Headings
        </CCardHeader>
        <CCardBody>
        </CCardBody>
      </CCard>
      <CCard>


      </CCard>
      <CCard>
        <CCardHeader>
          Inline text elements
        </CCardHeader>
        <CCardBody>

        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Description list alignment
        </CCardHeader>
        <CCardBody>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Typography
