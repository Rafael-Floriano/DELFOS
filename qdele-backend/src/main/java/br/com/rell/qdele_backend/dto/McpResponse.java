package br.com.rell.qdele_backend.dto;

import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonProperty;

public class McpResponse {
    @JsonProperty("response")
    private List<Map<String, Object>> data;

    public McpResponse() {
    }

    public McpResponse(List<Map<String, Object>> data) {
        this.data = data;
    }

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }
} 