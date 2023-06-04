import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Typography, Button, CircularProgress, Box } from '@mui/material';
import { LogInData } from '../../shared/types';
import { authActions } from '../../store/features/auth/auth.slice';
import { ID_INSTANCE_VALIDATION, API_TOKEN_VALIDATION } from '../../shared/constants';
import styles from './entry.module.scss';

export default function Entry() {
  const { authError, authLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LogInData>({ reValidateMode: 'onChange' });

  const onSubmit: SubmitHandler<LogInData> = (data) => {
    const { idInstance, apiTokenInstance } = data;
    dispatch(authActions.logIn({ idInstance, apiTokenInstance }));
  };

  return (
    <div className={styles.entry}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.entryForm}>
        <h1 className={styles.entryTitle}>Вход</h1>
        <TextField
          {...register('idInstance', ID_INSTANCE_VALIDATION)}
          label="Instance ID"
          size="small"
          fullWidth={true}
          error={errors.idInstance ? true : false}
          helperText={errors.idInstance?.message}
        />
        <TextField
          {...register('apiTokenInstance', API_TOKEN_VALIDATION)}
          type="password"
          label="Instance API Token"
          size="small"
          fullWidth={true}
          error={errors.apiTokenInstance ? true : false}
          helperText={errors.apiTokenInstance?.message}
        />
        {authError.status && (
          <Typography variant="caption" color="error">
            Ошибка авторизации. {authError.value}
          </Typography>
        )}
        <Box sx={{ position: 'relative' }}>
          <Button type="submit" variant="contained" disabled={authLoading}>
            Вход
          </Button>
          {authLoading && (
            <CircularProgress
              size={20}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-10px',
                marginLeft: '-10px'
              }}
            />
          )}
        </Box>
      </form>
    </div>
  );
}
