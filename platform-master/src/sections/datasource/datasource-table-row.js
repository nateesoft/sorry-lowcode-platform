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
export default function DatasourceTableRow({
  id,
  name,
  avatarUrl,
  tableCount,
  created,
  lastUserLogin,
  status,
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
        <TableCell></TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Link component={RouterLink} to={`/datasource/${id}`} sx={{ textDecoration: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{created}</TableCell>
        <TableCell>{tableCount}</TableCell>
        <TableCell>{lastUserLogin}</TableCell>

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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

DatasourceTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  created: PropTypes.any,
  tableCount: PropTypes.any,
  lastUserLogin: PropTypes.any,
  name: PropTypes.any,
  status: PropTypes.string,
};
