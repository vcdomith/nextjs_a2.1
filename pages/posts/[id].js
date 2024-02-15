import NextLink from 'next/link';
import { Box, Text } from '@skynexui/components';
import { useRouter } from 'next/router';
import dados from '../../dados.json'

//dica dos paths estaticos
export async function getStaticPaths() {

  // const paths = [
  //   { params: { id: '1' } },
  //   { params: { id: '2' } },
  //   { params: { id: '3' } },
  // ]
  const paths = dados.posts.map((postAtual) => {
    return { params: { id: `${postAtual.id}`} }
  })

  return {
    paths: paths,
    fallback: false // Caso não esteja listado acima gera um error 404
  }

}

export async function getStaticProps(context) {

  const id = context.params.id
  // const post = dados.posts.find((currentPost) => {
  //   if(currentPost.id === id) {
  //     return  true
  //   } else {
  //     return false
  //   }
  // })
  // const post = dados.posts.find((currentPost) => {
  //   return (
  //     (currentPost.id === id) 
  //       ? true 
  //       : false
  //   )
  // }
  // )
  const post = dados.posts.find((currentPost) => 
    (currentPost.id === id) 
      ? true 
      : false
  )

  return {
    props: {
      id: post.id,
      title: post.title,
      date: post.date,
      content: post.content,
    },
  }

}

export default function PostByIdScreen(props) {
  const router = useRouter();
  const post = {
    title: props.title,
    date: props.date,
    content: props.content,
  }

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '700px',
        paddingHorizontal: '16px',
      }}
    >
      {/* Cabeçalho */}
      <Text
        variant="heading2"
        tag="h1"
        styleSheet={{ color: '#F9703E', justifyContent: 'center', lineHeight: '1.2' }}
      >
        {post.title}
      </Text>
      <Text styleSheet={{ color: '#F9703E', justifyContent: 'center', borderBottom: '1px solid #F9703E', paddingVertical: '16px', marginVertical: '16px' }}>
        {post.date}
      </Text>

      {/* Área de Conteudo */}
      <Box
        styleSheet={{
          flexDirection: 'column',
        }}
      >
        <Text>
          {post.content}
        </Text>

        {post.video && <iframe style={{ marginTop: '32px', minHeight: '400px' }} src={post.video} /> }
      </Box>


      {/* Rodapé */}
      <Box
        styleSheet={{
          marginTop: '16px',
          paddingVertical: '16px',
          borderTop: '1px solid #F9703E',
          color: '#F9703E',
        }}
      >
        <NextLink href="/" passHref>
          <Text tag="a" styleSheet={{ hover: { textDecoration: 'underline' } }}>
            Voltar para a home
          </Text>
        </NextLink>
      </Box>
    </Box>
  )
}
