// Cart.js
import React, { useState } from 'react';
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const cartItems = [
  {
    id: '1',
    name: 'Drizzle 0.08ct Lab Grown Diamond Pendant',
    code: 'P-00233WHT',
    price: 625.00,
    goldType: 'Rose Gold',
    size: '18 Inches / 0.8',
    quantity: 1,
    imageUrl: 'link_to_image',
  },
  {
    id: '2',
    name: 'Lab Grown 0.95ctw Solitaire Stud Frame Earrings',
    code: 'E-03734WHT',
    price: 3398.00,
    goldType: 'Yellow Gold',
    size: '15.00mm / 0.95',
    quantity: 2,
    imageUrl: 'link_to_image',
  },
];

const Cart = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Cart</Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 800, padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Your Cart</Typography>
          <Divider />
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} sx={{ padding: 2 }}>
                <Box
                  component="img"
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                  src={item.imageUrl}
                  alt={item.name}
                />
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{item.goldType} / {item.size}</Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction sx={{ textAlign: 'right' }}>
                  <Typography variant="body1">${item.price.toFixed(2)}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 1 }}>
                    <IconButton edge="end" aria-label="remove">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ margin: '0 10px' }}>{item.quantity}</Typography>
                    <IconButton edge="end" aria-label="add">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" sx={{ padding: '16px 0' }}>
            Total: ${getTotalPrice()}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default Cart;
