import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useEpisodes } from '../provider';

const EpisodesSearch = () => {
  const [{ loading, name, episode }, { search }] = useEpisodes();

  return (
    <Formik
      initialValues={{ name, episode }}
      validationSchema={Yup.object({
        name: Yup.string().trim(),
        episode: Yup.string().trim(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        if (values.name !== name || values.episode !== episode) {
          console.log('submit', values);
          search(values.name, values.episode);
        } else setSubmitting(false);
      }}
    >
      {({ isSubmitting, setSubmitting, resetForm }) => {
        if (isSubmitting && !loading) setSubmitting(false);

        return (
          <StyledForm>
            <Grid container justify="flex-start" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={4}>
                <Field
                  component={TextField}
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  component={TextField}
                  fullWidth
                  id="episode"
                  label="Episode"
                  name="episode"
                  variant="outlined"
                />
              </Grid>
              <CenteredGrid item xs={12} sm={4}>
                <Button
                  aria-label="Search"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  size="small"
                >
                  Search
                </Button>
                <Button
                  aria-label="Reset"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  onClick={() => {
                    search('', '');
                    resetForm({ values: { name: '', episode: '' } });
                  }}
                  size="small"
                >
                  Reset
                </Button>
              </CenteredGrid>
            </Grid>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default EpisodesSearch;

const StyledForm = styled(Form)`
  padding-bottom: 18px;
`;

const CenteredGrid = styled(Grid)`
  text-align: center;

  & > button {
    margin: 0 4px;
  }
`;
