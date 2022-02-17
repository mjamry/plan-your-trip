import React from 'react';
import {
  ThemeProvider, Theme, StyledEngineProvider, createTheme, responsiveFontSizes,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { RecoilRoot } from 'recoil';
import ToasterNotificationsComponent from './components/ToasterNotifications';
import { PlansStateProvider } from './State/PlansState';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type Props = {
  children: JSX.Element
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

function AppContext({ children }: Props) {
  return (
    <RecoilRoot>
      <ToasterNotificationsComponent />
      <PlansStateProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              {children}
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </PlansStateProvider>
    </RecoilRoot>
  );
}

export default AppContext;
