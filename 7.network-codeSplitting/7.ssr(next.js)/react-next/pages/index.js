import Layout from './components/MyLayout';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Ssr from './ssr-test'
/* 
  next/link는 location.history를 지원한다
*/

const PostLink = ({ show }) => {
  return (
    <li>
      <Link as={`/p/${show.id}`} href={`/post?title=${show.name}`}>
        <a>{post.title}</a>
      </Link>
    </li>
  )
}

const Index = (props) => {
  return(
  <Layout>
    <h1> 베트맨 TV 쑈!!! </h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    shows: data
  }
}

export default Index



// const PostLink = (props) => {
//   console.log('PostLink', props)
//   return (
//     <li>
//       <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
//         <a>{props.title}</a>
//       </Link>
//     </li>
//   )
// }

// export default () => {
//   return (
//     <Layout>
//       <h1> My Blog </h1>
//       <ul>
//         <PostLink id="hello-nextjs" title="Hello Next.js" />
//         <PostLink id="learn-nextjs" title="Learn Next.js" />
//         <PostLink id="deploy-nextjs" title="Deploy Next.js" />
//       </ul>
//     </Layout>
//   )
// }