import React from 'react'
import Layout from '../components/Layout'
import HeroSpacer from '../components/common/HeroSpacer'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'
import SEO from '../components/Seo'

const SeriesTemplate = props => {
  const {
    data: {
      series: { nodes: posts },
    },
  } = props
  const {
    pageContext: { series },
  } = props
  return (
    <Layout>
      <SEO title={series} />
      <HeroSpacer />
      <Posts posts={posts} title={`series / ${series}`} />
    </Layout>
  )
}

export const query = graphql`
  query GetSeries($series: String) {
    series: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { series: { eq: $series } }
        fileAbsolutePath: { regex: "/posts/" }
      }
    ) {
      nodes {
        excerpt
        frontmatter {
          title
          author
          category
          date(formatString: "MMMM, Do YYYY")
          slug
          cover {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
      }
    }
  }
`

// export const pageQuery = graphql`
//   query SeriesBySlug($series: String) {
//     allMdx(
//       sort: { fields: [fields___date], order: DESC }
//       filter: {
//         fileAbsolutePath: { regex: "/posts/" }
//         frontmatter: { series: { eq: $series } }
//       }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//             date
//           }
//           excerpt
//           timeToRead
//           frontmatter {
//             path
//             title
//             author
//             tags
//             series
//             category
//             cover {
//               childImageSharp {
//                 fluid {
//                   ...GatsbyImageSharpFluid_withWebp
//                 }
//               }
//             }
//             date
//           }
//         }
//       }
//     }
//   }
// `

export default SeriesTemplate
