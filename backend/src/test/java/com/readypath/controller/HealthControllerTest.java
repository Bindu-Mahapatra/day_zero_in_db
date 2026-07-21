package com.readypath.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HealthControllerTest {

    @Test
    void shouldReturnHealthStatus() {
        HealthController controller = new HealthController();
        assertEquals("OK", controller.health());
    }
}
