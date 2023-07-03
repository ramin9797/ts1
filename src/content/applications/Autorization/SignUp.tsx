import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container,Link, Typography, styled,Box,Stack } from '@mui/material';
import FormInput from 'src/components/FormInput/FormInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { LinkItem } from './Login';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';


import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 👇 SignUp Schema with Zod
const signupSchema = object({
    name: string().min(1, 'Name is required').max(70),
    email: string().min(1, 'Email is required').email('Email is invalid'),
    password: string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

  // 👇 Infer the Schema to get TypeScript Type
type ISignUp = TypeOf<typeof signupSchema>;

function RegisterPage() {

const defaultValues: ISignUp = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    };

     // 👇 Object containing all the methods returned by useForm
  const methods = useForm<ISignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });
  

  return (
    <>
      <Helmet>
        <title>Login Page - Authorization</title>
      </Helmet>
      <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '6rem',
              px: '1rem',
            }}
          >
             <FormProvider {...methods}>
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  mb: '1.5rem',
                  pb: { sm: '3rem' },
                }}
              >
                Welcome To Loop True!
              </Typography>
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: '1px solid #ddd' } }}
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ paddingRight: { sm: '3rem' } }}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Create new your account
                    </Typography>

                    <FormInput
                      label='Name'
                      type='text'
                      name='name'
                      focused
                      required
                    />
                    <FormInput
                      label='Enter your email'
                      type='email'
                      name='email'
                      focused
                      required
                    />
                    <FormInput
                      type='password'
                      label='Password'
                      name='password'
                      required
                      focused
                    />
                    <FormInput
                      type='password'
                      label='Confirm Password'
                      name='passwordConfirm'
                      required
                      focused
                    />

                    <LoadingButton
                      loading={false}
                      type='submit'
                      variant='contained'
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                  <Typography
                    variant='h6'
                    component='p'
                    sx={{
                      paddingLeft: { sm: '3rem' },
                      mb: '1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    Sign up using another provider:
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}
                  >
                    Google
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent='center'>
                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                    Already have an account? <LinkItem to='/register'>Login</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
      <Footer />
    </>
  );
}

export default RegisterPage;