import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './style'
import CartItem from './CartItem/CartItem'

function Cart({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) {
  //   const isEmpty = !cart.line_items.length
  //   const isEmpty = !true
  const classes = useStyles()

  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link to='/' className={classes.link}>
        start shopping now
      </Link>
    </Typography>
  )

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={onEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to='/checkout'
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  )

  if (!cart.line_items) return 'Loading...'
  return (
    <Container>
      <div className={classes.toolbar}></div>
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart
