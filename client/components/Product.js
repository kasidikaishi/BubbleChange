import React from "react";
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Product(props) {
  const product = props.product;
  return (
    // <div className="card">
    //   <img alt="Avatar" style={{width: '15rem'}} src={product.imageUrl}/>
    //   <div className="container">
    //     <div className="product-name">{product.name}</div>
    //     <div>{`Bubble: ${product.bubble}`}</div>
    //   </div>
    // </div>
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardMedia
        component="img"
        height="380"
        image={product.imageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.bubble}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">BUY</Button>
      </CardActions>
    </Card>
  );
}
