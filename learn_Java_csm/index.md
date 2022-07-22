# CSM学习笔记

## 类和对象

1. `private`类型的变量和方法只能在本类的方法获取，`public`类型的变量和方法可以在任意包（`package`）的任意类获取，`protect`类型的变量是**默认**选择，它们可以在同一个包的任何类中获取。在类外获取本类的变量或者调用方法，需要用点操作符（dot operator）。

2. 在声明变量或方法时添加关键字`static`，则称为静态变量或静态方法。静态变量或方法对于本类的所有对象是通用的。静态变量或方法通过**类名**来获取或调用。例如，`Math`类的静态变量`Math.PI`与静态方法`Math.sin(double), Math.log(double), Math.exp(double)`，以及两类反正切函数：

   ```java
   static double atan(double a);
   // 返回参数的反正切值，其范围为 -pi/2 through pi/2.
   
   static double atan2(double y, double x);
   // 返回直角坐标 (x, y)所对应的极坐标(r, theta)的角度(theta)值
   ```

3. 在声明变量时添加关键字`final`，则变量值在创建后即不可修改，类似于常量。常量一般用大写字母表示，变量一般用小写字母。

4. 构造函数（`constructor`）：在对象创建时分配内存，并初始化实例变量（instance variable）。构造函数可以**重载**（重新定义，函数名相同但参数列表或返回值类型不同）。若构造函数的输入参数与本类的成员变量名称相同，则可以使用`this`表示本类的成员变量。例如：

```java
// FallingBall.java
public class FallingBall
{
    double dt = 0.01;				// Protect
    public double y = 0, v = 0;		// Public
    private String name;			// Private
    final static double g = 9.80;	// 重力加速度；静态；常量
    
    public FallingBall()
    {
        System.out.println("调用不带参数的构造函数");
    }
    
    public FallingBall(double dt)
    {
        this.dt = dt;
        System.out.println("调用带参数的构造函数");
    }
    
    // ......
}
```

5. 类的继承（inheritance）：使用`extends`关键字，子类（subclass）继承父类（superclass）。除了显式声明为private的以外，子类可以继承父类的方法和数据。子类也可以**重写**父类已有的函数。例如：

```java
// FallingParticle.java
public class FallingParticle extends Particle
{
    // 变量声明
    // 构造函数：若父类（superclass）的继承函数有参数，可以用super()方法
    // 其他函数
}
```

我们可以创建新的子类（`FallingParticle`）对象，并将其赋值给父类（`Particle`）类型的对象。例如：

```java
// FallingParticleApp.java
// 注意：此文件需与FallingParticle.java处在同一个包（package）中，且首行语句指定包的位置。
public class FallingParticleApp // 主函数所在，故类名后缀App
{
    public static void main(String[] args) // 主函数
    {
        Particle ball = new FallingParticle();
        // ......
    }
}
```

## Open Source Physics 库

### OSP库的下载

* OSP库的Jar文件的下载链接为：https://www.compadre.org/osp/document/ServeFile.cfm?ID=7154&DocID=353&Attachment=1

（至少需要Java 1.5以上的版本；下载之后，可以直接在本地Java环境下运行（双击即可））

* OSP库的源代码可以从以下`Github`仓库下载：
  * https://github.com/OpenSourcePhysics/osp

* 相配套的电子书的下载链接为：https://www.compadre.org/osp/document/ServeFile.cfm?ID=7375&DocID=527&Attachment=1

* 电子书所用的Java程序源代码见`Github`仓库：
  * https://github.com/OpenSourcePhysics/csm

* 将OSP源代码和电子书示例代码结合起来，形成Java工作区。此工作区可从以下的链接下载：https://www.compadre.org/osp/document/ServeFile.cfm?ID=7147&DocID=349&Attachment=1

### 使用OSP库画图

我们可以使用`Plotframe`类画图。例如：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;
import org.opensourcephysics.frames.PlotFrame;

/**
 * PlotFrameApp demonstrates the use of the Open Source Physics library to produce a simple plot.
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0 05/07/05
 */
public class PlotFrameApp {

  /**
   * Starts the Java application.
   * @param args  command line parameters
   */
  public static void main(String[] args) {
    PlotFrame frame = new PlotFrame("x", "sin(x)/x", "Plot example");
//    横坐标名称，纵坐标名称，图像标题
    
    for(int i = -100;i<=100;i++) {
      double x = i*0.2;
      frame.append(0, x, Math.sin(x)/x);
//      数据集的标志（整数），横坐标，纵坐标
    }
    frame.setVisible(true);
//    作用：将图像显示在屏幕（或其他前端）上
    
    frame.setDefaultCloseOperation(javax.swing.JFrame.EXIT_ON_CLOSE);
//    作用：当用户关闭图窗时，程序退出（结束运行）
  }
}
```

运行程序后，输出一个图窗，如下图所示：

![plot sin(x)/x](https://hayao-1111.github.io/learn_Java_csm/CSM_learning/plot_sinx_over_x.jpg)

### 使用OSP建立用户控制界面

我们可以使用`controls`包建立用户控制界面。例如：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;
import org.opensourcephysics.controls.*;

/**
 * CalculationApp demonstrates the use of a CalculationControl.
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0  05/07/05
 */
public class CalculationApp extends AbstractCalculation {

  /**
   * Does a calculation.
   */
  public void calculate() { 
    control.println("Calculation button pressed.");
    double x = control.getDouble("the x value"); 
      // 字符串须与setValue方法中的字符串相同
    control.println("x*x = "+(x*x));
    control.println("random = "+Math.random());	// 随机数，取值范围[0, 1)
  }

  /**
   * 将程序重置到初始状态
   */
  public void reset() {
    control.setValue("the x value", 10.0); 
  }

  /**
   * Starts the Java application.
   * @param args  command line parameters
   */
  public static void main(String[] args) { 
    CalculationControl.createApp(new CalculationApp());
// 用此类创建一个计算控制结构
// createApp: 实例化CalculationControl类型的对象并返回这个对象
  }
}
```

编译并运行后，点击`Calculate`按钮，程序底部的聊天框输出计算结果，如图所示：

![calculationApp controller](https://hayao-1111.github.io/learn_Java_csm/CSM_learning/calculationApp.jpg)

在本程序中，`CalculationApp`类继承了抽象类（abstract class）`AbstractCalculation`，并实现（implement）了其中的抽象方法`calculate()`与方法`reset()`。当用户按下`Calculate`按钮时，程序调用方法`calculate()`；当用户按下按钮`Reset`时，程序调用方法`reset()`。

程序最后，我们调用`CalculationControl`类的静态方法`createApp()`来创建一个图形用户界面（GUI）。静态方法`createApp()`的参数为本类（即`CalculationApp`类）的对象，因此我们在其参数列表中写：`new CalculationApp ()`。

### 绘图与控制相结合

我们可以将绘图和控制结合起来。例如：

`Particle.java`：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;

/**
 * Particle 对一维运动建模，可以数值地或者解析地求解其运动轨迹
 * 此类是抽象类，因为粒子的运动方程未知.
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0 05/07/05
 */
abstract public class Particle {
  double y, v, t; // 位置、速度、时间
  double dt;      // 时间步长

  /**
   * 构造函数
   */
  public Particle() { // constructor
    System.out.println("A new Particle is created.");
  }

  /**
   * 用某种数值方法向前推进一步.抽象方法.
   */
  abstract protected void step();

  /**
   * 用解析解计算位置.抽象方法.
   *
   * @return double
   */
  abstract protected double analyticPosition();

  /**
   * 用解析解计算速度.抽象方法.
   *
   * @return double
   */
  abstract protected double analyticVelocity();
}
```



`FallingParticle.java`：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;

/**
 * FallingParticle 继承Particle类，构建描述物体自由下落的物理模型.
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0 05/07/05
 */
public class FallingParticle extends Particle {
  final static double g = 9.8;   // 常量
  private double y0 = 0, v0 = 0; // 初始位置和初始速度

  // 构造函数    
  public FallingParticle(double y, double v) 
  { 
    System.out.println("A new FallingParticle object is created.");
    this.y = y; // 将传入的参数值赋值给成员变量
    this.v = v; 
    y0 = y;     // 这里不必使用"this"，因为只有一个y0，不会引发歧义
    v0 = v;
  }

  /**
   * 用Euler算法推进动态变量（位置、速度与时间）.
   */
  public void step() {
    y = y+v*dt; // Euler算法
    v = v-g*dt;
    t = t+dt;
  }

  /**
   * 计算位置和速度的解析解
   */
  public double analyticPosition() {
    return y0+v0*t-(g*t*t)/2.0;
  }

  public double analyticVelocity() {
    return v0-g*t;
  }
}
```



`FallingParticlePlotApp.java`：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;
import org.opensourcephysics.controls.*;
import org.opensourcephysics.frames.*;

/**
 * FallingParticlePlotApp 计算小球落地时间并绘制高度随时间变化的曲线
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0  05/07/05
 */
public class FallingParticlePlotApp extends AbstractCalculation {
  PlotFrame plotFrame = new PlotFrame("t", "y", "Falling Ball");

  public void calculate() {
    plotFrame.setAutoclear(false); // 数据在计算开始时不清除

    double y0 = control.getDouble("Initial y");
    double v0 = control.getDouble("Initial v");

    Particle ball = new FallingParticle(y0, v0);

    ball.dt = control.getDouble("dt");
    while(ball.y>0) 
    {
      ball.step();
      plotFrame.append(0, ball.t, ball.y);
      plotFrame.append(1, ball.t, ball.analyticPosition());
      // 两套数据集，序号分别是0和1
    }
  }

  public void reset() {
    control.setValue("Initial y", 10);
    control.setValue("Initial v", 0);
    control.setValue("dt", 0.01);
  }

  public static void main(String[] args) { 
    CalculationControl.createApp(new FallingParticlePlotApp());
  }
}
```

编译并运行后，得到如图所示的输出：

![](https://hayao-1111.github.io/learn_Java_csm/CSM_learning/FallingParticlePlotApp.jpg)



### 控制浮点数的输出格式

有多种方法可以控制浮点数的输出格式。例如，若要将输出格式设定为显示3位小数，则：

* 方法1：引入`java.text.DecimalFormat`类。例如：

```java
import java.text.DecimalFormat;

// ...
double y = 1/3.0 + 2/7.0;

DecimalFormat digit2 = new DecimalFormat("#0.000");// 输出小数位数的格式
control.println("y = "+digit2.format(y));
```

* 方法2：使用OSP的`controls`包中的`ControlUtils`类。若要保留三位小数，则使用其中的`f3`方法。例如：

```java
import org.opensourcephysics.controls.ControlUtils;

// ...
double y = 1/3.0 + 2/7.0;
```



### 使用OSP进行模拟

我们可以使用OSP的`AbstractSimulation`类进行多线程的模拟。多线程可以使程序分别独立地执行不同语句。例如，我们可以使线程1更新物理模型，展示结果，使线程2监控键盘和鼠标以随时停止程序。

我们可以继承`AbstractSimulation`类，并实现其中的`doStep()`方法，最后用`SimulationControl`类创建一个GUI。例如：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;
import org.opensourcephysics.controls.AbstractSimulation;
import org.opensourcephysics.controls.SimulationControl;

/**
 * SimulationApp demonstrates a SimulationControl.
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0  05/07/05
 */
public class SimulationApp extends AbstractSimulation {
  int counter = 0;

  /**
   * Does a simulation step by decrementing the counter.
   */
  public void doStep() { 
    control.println("Counter = "+(counter--));
  }

  /**
   * Initializes the simulation by setting the counter variable
   */
  public void initialize() {
    counter = control.getInt("counter");
  }

  /**
   * Resets the simulation parameters to their intial state.
   */
  public void reset() { // invoked when reset button is pressed
    control.setAdjustableValue("counter", 100); // allows dt to be changed after initializaton
  }

  /**
   * Starts the Java application.
   * @param args  command line parameters
   */
  public static void main(String[] args) {
    // creates a simulation structure using this class
    SimulationControl.createApp(new SimulationApp());
  }
}
```

典型的模拟包括三步：初始化（initialize）、单步推进（doStep）、重设（reset）。



### 使用OSP展示动画

我们可以使用`DisplayFrame`类来展示动画效果。例如：

`BouncingBall.java`：

```java
/*
 * Open Source Physics
 */

package org.opensourcephysics.sip.ch02;
import org.opensourcephysics.display.Circle;

/**
 * BouncingBall模拟小球下落并触壁（或触地）反弹的物理过程
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0 05/07/05
 */
public class BouncingBall extends Circle 
{ // Circle是一个可以画出自身的类
  final static double g = 9.8; 
  final static double WALL = 10;
  private double x, y, vx, vy; // 初始位置和速度

  /**
   * 构造函数
   */
  public BouncingBall(double x, double vx, double y, double vy) 
  { 
    this.x = x;   
    this.vx = vx;
    this.y = y;
    this.vy = vy;
    setXY(x, y); // 用父类Circle的setXY方法设置坐标位置
  }


  public void step(double dt) {
    x = x+vx*dt; // Euler算法
    y = y+vy*dt;
    vy = vy-g*dt;
    if(x>WALL) {
      vx = -Math.abs(vx); // 从右侧墙壁反弹
    } else if(x<-WALL) {
      vx = Math.abs(vx);  // 从左侧墙壁反弹
    }
    if(y<0) {
      vy = Math.abs(vy); // 从地面反弹
    }
    setXY(x, y);
  }
}
```



`BouncingBallApp.java`：

```java
/*
 * Open Source Physics software
 */

package org.opensourcephysics.sip.ch02;
import org.opensourcephysics.controls.*;
import org.opensourcephysics.frames.*;

/**
 * BouncingBallApp 模拟了一群小球的运动（不考虑非弹性碰撞、不考虑球与球之间的相互作用）.
 *
 * @author Wolfgang Christian, Jan Tobochnik, Harvey Gould
 * @version 1.0 05/07/05
 */
public class BouncingBallApp extends AbstractSimulation {
  // 声明（declare）并实例化（instantiate）了一个绘制小球们的窗体（window）
  DisplayFrame frame = new DisplayFrame("x", "y", "Bouncing Balls");
    
  // 声明了由BouncingBall对象组成的数组
  BouncingBall[] ball;
    
  double time, dt;

  /**
   * 初始化：创建BouncingBall对象并将其添加到框架（frame）中.
   */
  public void initialize() 
  {
    frame.setPreferredMinMax(-10.0, 10.0, 0, 10);// 设置窗体的坐标上下界（物理坐标系）
    time = 0;
    frame.clearDrawables(); // 清除旧的小球
      
    // 从GUI中读取用户输入
    int n = control.getInt("number of balls");
    int v = control.getInt("speed");
      
    ball = new BouncingBall[n]; // 实例化BouncingBall对象的数组
      
    for(int i = 0;i<n;i++) {
      double theta = Math.PI*Math.random(); // 均匀分布的随机角度
      // 实例化第i个BouncingBall对象
      ball[i] = new BouncingBall(0, v*Math.cos(theta), 0, v*Math.sin(theta));
      frame.addDrawable(ball[i]);           //将小球添加到框架（frame）中，使其可以被展示
    }
    // decimalFormat是在父类中实例化的对象，可以用来控制浮点数的小数位数
    frame.setMessage("t = "+decimalFormat.format(time)); // setMessage的信息出现在右下角
  }

  /**
   * 单步推进：每1/10秒调用一次，计时器在父类AbstractSimulation中.
   */
  public void doStep() 
  { 
    for(int i = 0;i<ball.length;i++) {
      ball[i].step(dt);
    }
    time += dt;
    frame.setMessage("t="+decimalFormat.format(time));
  }

  /**
   * 检查时间步长参数，当start或step按钮被按下时调用.
   */
  public void startRunning() { 
    dt = control.getDouble("dt");
  }

  /**
   * 重置，当reset按钮被按下时调用.
   */
  public void reset() { 
    control.setAdjustableValue("dt", 0.1); // 使得初始化后仍可修改dt
    control.setValue("number of balls", 40);
    control.setValue("speed", 10);
  }

  /**
   * Starts the Java application.
   * @param args  command line parameters
   */
  public static void main(String[] args) { 
      // 用此类开始动画控制结构
    SimulationControl.createApp(new BouncingBallApp());
  }
}
```

输出结果如下图所示：

![](https://hayao-1111.github.io/learn_Java_csm/CSM_learning/BouncingBallApp.jpg)

可以继续完善：我们可以在`reset()`方法中添加命令：

```java
enableStepsPerDisplay(true);
```

如此，在模拟的GUI中，用户便可以设置每隔多少步展示一次。

OSP中的类大多是从基本的Java类中继承而来的。例如，`Plotframe`类的继承关系可以上溯到`java.swing.Jframe`类，其继承关系图如下图所示：

![](https://hayao-1111.github.io/learn_Java_csm/CSM_learning/Jframe_extends.jpeg)

## 程序模拟的指导思路

一个好的物理计算程序，其代码应具有较好的可用性，其程序应兼具“**物理模型(Model) - 可视化(View) - 用户控制界面(Control)**”三大元素。
