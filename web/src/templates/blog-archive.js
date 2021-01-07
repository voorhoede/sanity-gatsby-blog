import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import localize from '../components/localize'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title {
            _type
            en
            nl
          }
          koptekst {
            _type
            en
            nl
          }
          beschrijving {
            _type
            en
            nl
          }
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const ArchivePage = (props) => {
  // TODO: REMOVE CONSOLE LOG
  console.log(props)
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      <SEO title='Archive' />
      <Container>
        <h1 className={responsiveTitle1}>Archive</h1>
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  )
}

export default localize(ArchivePage)