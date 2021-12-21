// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {

    uint public taskCount = 0;
    mapping(uint => Task) public tasks;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    constructor() public {
        addTask("Learn Solidity");
    }

    function addTask(string memory _content) public {
        tasks[taskCount] = Task(taskCount, _content, false);
        taskCount++;
    }

    function getTaskName(uint _index) public view returns(string memory) {
        return tasks[_index].content;
    }

    function completeTask(uint _index) public {
        tasks[_index].completed = true;
    }

    function removeTask(uint _index) public {
        delete tasks[_index];
        taskCount--;
    }

}
