import { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import validate from '../../utils/validateBookForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'material-react-toastify'
import { DatePicker } from '@mui/x-date-pickers'

function AddBook() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    thumbnail: '',
    file: '',
    title: '',
    author: '',
    genre: '',
    publisher: '',
    publicationYear: null,
  })
  const [errors, setErrors] = useState({})
  const { title, author, genre, publisher, publicationYear, thumbnail } =
    formData

  const onChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    toast.success('Book added to the inventory')
    navigate('/admin/dashboard')
  }

  return (
    <Grid container justifyContent='center' my={2}>
      <Grid item md={8} sm={10} xs={12}>
        <Box my={2}>
          <Typography textAlign='center' variant='h4'>
            Add Book
          </Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Box my={2}>
            <Button variant='contained' component='label'>
              Upload Thumbnail
              <input
                type='file'
                name='thumbnail'
                value={thumbnail}
                onChange={onChange}
                accept='image/jpeg, image/png'
                id=''
                hidden
              />
            </Button>
            <Typography variant='body2' component='span' mx={1}>
              {thumbnail}
            </Typography>
          </Box>
          <Box my={2}>
            <TextField
              type='text'
              label='Title'
              fullWidth
              variant='standard'
              onChange={onChange}
              name='title'
              value={title}
              error={Boolean(errors.title)}
              helperText={errors?.title}
            />
          </Box>

          <Box my={2}>
            <TextField
              type='text'
              label='Author'
              fullWidth
              variant='standard'
              onChange={onChange}
              name='author'
              value={author}
              error={Boolean(errors.author)}
              helperText={errors?.author}
            />
          </Box>

          <Box my={2}>
            <TextField
              type='text'
              label='Genre'
              fullWidth
              variant='standard'
              onChange={onChange}
              name='genre'
              value={genre}
              error={Boolean(errors.genre)}
              helperText={errors?.genre}
            />
          </Box>

          <Box my={2}>
            <TextField
              type='text'
              label='Publisher'
              fullWidth
              variant='standard'
              onChange={onChange}
              name='publisher'
              value={publisher}
              error={Boolean(errors.publisher)}
              helperText={errors?.publisher}
            />
          </Box>

          <Box my={2}>
            <DatePicker
              views={['year']}
              label='Publication year'
              value={publicationYear}
              name='publicationYear'
              disableFuture
              onChange={(value) => {
                setFormData({ ...formData, publicationYear: value })
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  name='publicationYear'
                  error={Boolean(errors.publicationYear)}
                  helperText={errors?.publicationYear}
                />
              )}
            />
          </Box>
          <Box mb={10}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              type='submit'
            >
              Add
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}

export default AddBook
