package com.example.todoproject.service;

import com.example.todoproject.model.Todo;
import com.example.todoproject.repository.TodoRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Cacheable(value = "todos")
    public List<Todo> getAllTodos() {
        // Имитация задержки для демонстрации кэширования
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return todoRepository.findAll();
    }

    @Cacheable(value = "todo", key = "#id")
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    @CacheEvict(value = {"todos", "todo"}, allEntries = true)
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @CacheEvict(value = {"todos", "todo"}, allEntries = true)
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
