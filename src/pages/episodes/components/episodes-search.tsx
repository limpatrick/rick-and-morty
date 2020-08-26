import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import { isEmpty } from 'ramda';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useEpisodes, useEpisodesState } from '../provider';

const EpisodesSearchHandler = () => {
  const { loading, name, episode } = useEpisodesState();
  const { isSubmitting, setSubmitting, setValues } = useFormikContext();

  useEffect(() => {
    setValues({ name, episode });
  }, [episode, name, setValues]);

  useEffect(() => {
    if (isSubmitting && !loading) setSubmitting(false);
  }, [isSubmitting, loading, setSubmitting]);

  return null;
};

const EpisodesSearch = () => {
  const [{ name, episode }, { search }] = useEpisodes();

  return (
    <Formik
      initialValues={{ name, episode }}
      validationSchema={Yup.object({
        name: Yup.string().trim(),
        episode: Yup.string().trim(),
      })}
      onSubmit={(values, { setValues }) => {
        const newName = values.name.trim();
        const newEpisode = values.episode.trim();

        if (!isEmpty(newName) || !isEmpty(newEpisode)) search(newName, newEpisode);

        setValues({ name: newName, episode: newEpisode });
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <StyledForm>
          <EpisodesSearchHandler />
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
      )}
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
