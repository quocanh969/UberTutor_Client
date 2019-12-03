import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubjectIcon from '@material-ui/icons/Subject';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LayersIcon from '@material-ui/icons/Layers';
import PersonIcon from '@material-ui/icons/Person';

export const mainListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText primary="Professions" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BookOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EqualizerOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MailOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItem>
    </div>
  );