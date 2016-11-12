#include<QTRsensors.h>

#define RightMotorF
#define RightMotorB 
#define LeftMotorF
#define RightMotorB

float param[3]={0.7,0.1,0};
int current_time=0;
int last_time=0;

QTRSensorsRC qtr((unsigned char[]){A0, A1, A2, A3, A4, A5, 4, 3},8,2500);
void setup() {
pinMode(RightMotorF,OUTPUT);
pinMode(RightMotorB,OUTPUT);
pinMode(LeftMotorF,OUTPUT);
pinMode(LeftMotorB,OUTPUT);

for(int i=0 ; i<=100 ; i++)   // calibration for 2 seconds
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

void loop() {

unsigned int sensors[8];
int position=qtr.readLine(sensors,QTR_EMITTERS_ON,1);
error=position-3500;
current_time=millis();
derivative=error-lasterror;
diff_time=current_time-last_time;
last_time=current_time;
integral+=error;

int power_difference = param[0]*error + param[1]*derivative/diff_time + param[2]*integral;

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
  
