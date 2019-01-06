import Layout from './components/MyLayout'


const Post = (props) => (
  <Layout>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
      <img src={props.show.image.medium} />
  </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
// const Content = (props) => (
//   <div>
//     <h1>{props.url.query.title}</h1>
//     <p> This is the blog post content.</p>
//   </div>
// )

// export default (props) => (
//     <Layout>
//       <Content url={props.url} />
//     </Layout>
// )