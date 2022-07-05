function showDate()
{
    var date = Date();
    alert("当前的日期是:\n"+date);
}

function simpleLogin()
{
    var name;
    var pwd;

    name = window.prompt("你的名字");
    alert("Hello, " + name + "!" + "\n Please input your Password:");

    pwd = window.prompt("你的密码");
    if(isNaN(pwd))
    {
        alert("请输入数字！");
    }
    else
    {
        if(pwd == "123456")
        {
            alert("Password Right!");
        }
        else
        {
            alert("Wrong!!!");
        }
    }
}




showDate();

// alert("接下来，请输入你的名字：")







