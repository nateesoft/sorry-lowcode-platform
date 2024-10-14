import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from "react-router-dom"
import Link from "@mui/material/Link"

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------
export default function ServiceFlowTableRow({
  id,
  projectName,
  serviceFlowName,
  createdDate,
  updatedDate,
  version,
  manager,
  status,
  projectUrl,
  serviceFlowUrl,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell>{id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar alt={projectName} src={projectUrl} sx={{ width: 24, height: 24 }} />
            <Typography variant="subtitle2" noWrap>
              {projectName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar alt={serviceFlowName} src={serviceFlowUrl} sx={{ width: 24, height: 24 }} />
            <Link component={RouterLink} to={`/serviceflows/${id}`} sx={{ textDecoration: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {serviceFlowName}
              </Typography>
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{updatedDate}</TableCell>
        <TableCell>{version}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      > 
        <Link component={RouterLink} to={`/serviceflows/${id}`} sx={{ textDecoration: 0 }}>
          <MenuItem>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ServiceFlowTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
