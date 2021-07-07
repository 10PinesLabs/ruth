import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import {ReunionesActivasWrapper, ReunionesActivasTitle} from "./EmpezarReunion.styled";
import {ReunionActivas} from "./ReunionesActivas";
import {ReunionCerradas} from "./ReunionesCerradas";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div>
            <Tabs
                value={value}
                TabIndicatorProps={{style: {backgroundColor: '#448475'}}}
                onChange={handleChange}
                indicatorColor="primary"
                variant="fullWidth"
            >
                <ReunionesActivasTitle label="Reuniones Abiertas"/>
                <ReunionesActivasTitle label="Reuniones Cerradas"/>
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}  //lo que hace es mover la tab de forma mas amena
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ReunionesActivasWrapper>
                        <ReunionActivas/>
                    </ReunionesActivasWrapper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ReunionesActivasWrapper>
                        <ReunionCerradas/>
                    </ReunionesActivasWrapper>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
