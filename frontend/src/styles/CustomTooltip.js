import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React from "react";

const CustomTooltip = ({children, disable, title}) => {
    return <Tooltip title={<Typography color="inherit">{title}</Typography>}
                    disableFocusListener
                    disableTouchListener
                    open={disable ? undefined : false}>
        <span>
            {children}
         </span>
    </Tooltip>
}

export default CustomTooltip