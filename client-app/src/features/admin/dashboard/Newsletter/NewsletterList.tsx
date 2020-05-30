import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

const NewsletterList = () => {
    return (
        <Segment raised> 
                  <Header
        content="Newsletter List"
        size="huge"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
        </Segment>
    )
}

export default NewsletterList
