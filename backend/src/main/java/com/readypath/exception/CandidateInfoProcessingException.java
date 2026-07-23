package com.readypath.exception;

public class CandidateInfoProcessingException extends RuntimeException {

    public CandidateInfoProcessingException(String message) {
        super(message);
    }

    public CandidateInfoProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}

