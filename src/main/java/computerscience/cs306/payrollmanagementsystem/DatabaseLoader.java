package computerscience.cs306.payrollmanagementsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Employee("Frodo", "Baggins", "ring bearer", 40, 40));
        this.repository.save(new Employee("John", "Smith", "I love cats", 15, 40));
        this.repository.save(new Employee("Michael", "Johnson", "I love protein shakes", 15, 30));
        this.repository.save(new Employee("Ronnie", "Coleman", "I enjoy walks at the beach", 15, 20));
        this.repository.save(new Employee("Jay", "Cutler", "I enjoy movies", 30, 50));
        this.repository.save(new Employee("Phil", "Heath", "I am a bodybuilder", 30, 30));
    }
}
