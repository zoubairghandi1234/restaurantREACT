import React from "react";
import { Button, Spinner } from "react-bootstrap";
export default function ({ busy, children, variant, onClick}) {
      const style = 'style={{ width: "100%" }}'
  return (
    <Button type="submit" className="d-block gap-2" onClick={onClick} variant={variant} style={{ width: "100%" }}>
      {busy ? (
        <span>
          <Spinner size="sm" />
          Loading...
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
