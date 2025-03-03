package br.com.rell.qdele_backend.conf;

import br.com.rell.qdele_backend.exceptions.NotFoundException;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Hidden
@ControllerAdvice
public class CustomExceptionHandler {

        @ExceptionHandler(NotFoundException.class)
        public Object NotFoundExceptionHandler(NotFoundException notFoundException) {
            return ResponseEntity.status(404).body(notFoundException.getMessage());
        }

}
