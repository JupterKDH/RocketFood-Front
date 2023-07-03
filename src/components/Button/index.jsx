import { TbReceipt } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive';

import { Container } from "./styles";

export function Button({title, loading = false, isClient, ...rest}) {
  const isDesktop = useMediaQuery({minWidth: 1024});

  return (
    <Container
      type="button"
      disabled={loading}
      {...rest}
    >
     {isClient && <TbReceipt size={"3.2rem"}/>}
     {loading ? "Carregando..." : title}
     {isClient && <span>{isDesktop ? `(${rest.orderCount})` : rest.orderCount}</span>} 
    </Container>
  );
}