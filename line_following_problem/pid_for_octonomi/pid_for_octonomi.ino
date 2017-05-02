/*.... THIS PROGRAM ILLUSTRATES THE BASIC CODE FOR THE LINE FOLLOWING ROBOT USING THE PID ( PROPORTIONAL, INTEGRAL AND DERIVATIVE ) CONTROL LOOP ....*/

#include<QTRsensors.h>

/*.... declaration of the Motor pins on the arduino board.....*/

#define RightMotorF
#define RightMotorB 
#define LeftMotorF
#define LeftMotorB

float param[3]={0.7,0.1,0};   // param vector stores the PDI constants ( proportional , derivative and integral constants ) which are tuned manually
int current_time=0;
int last_time=0;

QTRSensorsRC qtr((unsigned char[]){A0, A1, A2, A3, A4, A5, 4, 3},8,2500);  // declaration of sensor pins on the arduino board on which the inputs by the QTR sensors will be given

/*... THE FUNCTION SETUP IS EXECUTED ONLY ONCE....*/

void setup() {
  
/*...initializing the Motor pins as OUTPUT pins ( pin on which output will be given ).... */
  
pinMode(RightMotorF,OUTPUT);   
pinMode(RightMotorB,OUTPUT);
pinMode(LeftMotorF,OUTPUT);
pinMode(LeftMotorB,OUTPUT);

for(int i=0 ; i<=100 ; i++)   // calibration of QTR sensors for 2 seconds
{  qtr.calibrate();
   delay(20); }
last_time=millis();

}

int error=0;
int lasterror=0;
int derivative=0;
int integral=0;
int maximum=150;
int diff_time;

/*...THE FUNCTION LOOP IS AN ITERATION WHICH RUNS INFINITELY UNTILL YOU STOP THE ROBOT...*/

void loop() {

unsigned int sensors[8];
int position=qtr.readLine(sensors,QTR_EMITTERS_ON,1);

/*.....implementation of PID.....*/

error=position-3500;     // calculating the proportional error ( Proportional term of PID )  
current_time=millis();     // millis function gives the current time
diff_time=current_time-last_time;    //calculating the time difference to find the rate change of error
derivative=( error-lasterror ) / diff_time;   // finding the rate of change of error (the derivative term of PID )
last_time=current_time;    // stores the previous time to find the time difference
integral+=error;      // calculating the summation of all the errors occurred during the run ( the integral term of PID )

int power_difference = param[0]*error + param[1]*derivative + param[2]*integral;     // calculating the power difference needed to turn the robot using PID ( proportional, integral and derivative errors)

/*... moving the robot by calculating the power difference above.....*/
if(power_difference<0)
{ analogWrite(LeftMotorF,maximum);
  analogWrite(LeftMotorB,0);
  analogWrite(RightMotorF,maximum + power_difference);
  analogWrite(RightMotorB,0);
}
else
{ analogWrite(LeftMotorF,maximum - power_difference);
  analogWrite(LeftMotorB,0);
  analogWrite(RightMotorF,maximum);
  analogWrite(RightMotorB,0);
}
}
  
