/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const deleteKey = () => {
  setTimeout(() => {}, 5000)
  for (let i = 0; i < list.length; i += 1) {
    try {
      const finalResponse = axios.delete('/api/v1/files', {
        filename: list[i]
      })
      // eslint-disable-next-line no-console
      console.log('On delete: ', JSON.stringify(finalResponse))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

const maxFileSize = (images) => {
  const theSize = 1000000
  console.log(images[0].size)
  for (let i = 0; i < images.length; i += 1) {
    if (images[i] > theSize) {
      // eslint-disable-next-line no-alert
      alert('file is too large, 1 mb max')
      return false
    }
  }
  return true
}

const sendToServer = async (images) => {
  const formData = new FormData()
  Object.values(images).map((it) => formData.append('img', it))
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  try {
    const { data: res } = await axios.post('/api/v1/upload', formData, config)
    // eslint-disable-next-line array-callback-return
    res.map(({ filename: name, filepath: path }) => {
      dispatch(setList(name))
      dispatch(setUrl(path))
    })
  } catch (err) {
    if (err.response.status === 500) {
      // console.log('There was a problem with the server')
    } else {
      // console.log(err)
    }
  }
  // console.log(list)
}

// if (maxFilecount(images) && maxFileSize(images)) {
// }

const get = Promise.all(url.map((it) => sendToSSTK(it))).then((res) => {
  setKey(res)
})

const sendToSSTK = (uriIt) => {
  for (let i = 0; i < uriIt.length; i += 1) {
    try {
      const slice2Uri = uri.slice(uriIt.indexOf('data:image/jpeg;base64,') + 23)
      const { data: res } = axios.post('/api/v1/keyword', {
        uri: slice2Uri
      })
      dispatch(setDisplayWords(typeof res.data !== 'undefined' ? res.data : [null]))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

server.delete('/api/v1/files', async (req, res) => {
  const { filename } = req.body
  await unlink(`./dist/assets/uploads/${filename}`, (err) => {
    throw console.error(err)
  })
  res.json({ status: 'Deteted!' })
})

let nameList = []

server.post('/api/v1/upload', async (req, res) => {
  if (req.files === null) {
    res.status(400).json({ msg: 'No file uploaded' })
  }
  nameList = []
  const files = req.files.img
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const filename = file.name
    file.mv(`./dist/assets/uploads/${filename}`, (err) => {
      res.send(err)
    })
    nameList = [...nameList, { filename, filepath: `/uploads/${filename}` }]
  }
  res.send(nameList)
})
