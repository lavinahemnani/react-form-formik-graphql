import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import {ApolloClient} from "apollo-client"
import {ApolloProvider, Mutation} from "react-apollo"
import gql from "graphql-tag"

const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000', // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true"
  }
})

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})

const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;


export function UploadDoc() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
                <Mutation mutation={UPLOAD_FILE}>
                    {(singleUpload, { data, loading }) => {
                        console.log(data)
                        return (<form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                                    <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                        const file = files[0]
                                        file && singleUpload({ variables: { file: file } })
                                    }}/>{loading && <p>Loading.....</p>}</form>)}
                    }
                </Mutation>
        </header>
      </ApolloProvider>
    </div>
  );
}

