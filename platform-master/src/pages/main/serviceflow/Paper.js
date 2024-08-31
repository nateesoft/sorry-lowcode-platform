import React from "react";
import { Paper, Typography } from "@mui/material";

const SimplePaper = (props) => {
    return (
        <div>
            <Paper square="true" style={{
                "max-height": "300px",
                "min-height": "300px"
            }}>
                <Typography variant="h5" component="h3">
                    This is a sheet of paper.
                </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your
                    application.
                </Typography>
            </Paper>
        </div>
    );

}

export default SimplePaper;
