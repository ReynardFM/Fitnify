import { HfInference } from "@huggingface/inference";
import React, { useEffect, useState } from 'react';
import { Outfit } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });

const buttonContainer = {
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  margin: "20px 10px",
  padding: "20px",
  borderRadius: "20px",
  border: "2px solid rgba(255, 255, 255, 0.2)",
}

const graphics = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}

const buttonContentStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  width: "700px",
  flexDirection: "row"
};

const exercisesContainerStyle = {
  width: "745px",
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  margin: "20px 10px",
  padding: "20px",
  borderRadius: "20px",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  display: "flex",
  flexDirection: "column"
};

const instructionsContainerStyle = {
  width: "900px",
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  margin: "20px 10px",
  padding: "20px",
  borderRadius: "20px",
  border: "2px solid rgba(255, 255, 255, 0.2)",
}

const exerciseStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "10px",
  margin: "10px 0",
  cursor: "pointer"
};

const styledheader = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  fontSize: "30px"
}

const styledDaySchedule = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "110px",
}

const buttonBack = {
  marginLeft: "10px"
}

const title = {
  display: "flex",
  fontSize: "30px",
  marginBottom: "10px "
}

const imageStyle = {
  width: "375px",
  height: "400px",
  borderRadius: "15px",
  margin: "0 20px"
}

export default function AiPage({ data, plan, setPlan }) {

  const [selectedDay, setSelectedDay] = useState(null)

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
  const [ instruction, showInstruction ] = useState('');
  const [image, setImage] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [targetMuscle, setTargetMuscle] = useState('');
  function showInstruction2(name, targetMuscle){
    showInstruction(name);
    setTargetMuscle(targetMuscle);
  }

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_EX_API);
    console.log(process.env.NEXT_PUBLIC_AI_API);
    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${instruction.split('').map(char => (char === ' ' ? '%20' : char)).join('')}?offset=0&limit=10`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': (process.env.NEXT_PUBLIC_EX_API),
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };

    const fetchMuscles = async () => {
      if (!instruction) return; // Avoid fetching if instruction is empty
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!result || !Array.isArray(result) || result.length === 0) {
          console.log('No exercise data found in response');
          showInstruction(''); // Clear instruction if no data found
          return; // Exit the function early
        }
        const musclesGif = result[0].gifUrl;
        const muscleInstruction = result[0].instructions;
        setImage(musclesGif);
        setMuscles(muscleInstruction);
        console.log(image, muscles); // For debug
      } catch (error) {
        console.error('Failed to fetch muscle data:', error);
      }
    };
    fetchMuscles();
  }, [instruction]); 

  useEffect(() => {
    if(!localStorage.getItem("Plan")){
      console.log("Start fetching fitness routine...");
      const fetchFitnessRoutine = async () => {
        try {
          const client = new HfInference(process.env.NEXT_PUBLIC_AI_API);
          
          const chatCompletion = await client.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
              {
                role: "user",
                content: `{
  "prompt": "Generate a personalized weekly workout plan using ONLY the provided user data. Respond with a valid JSON array of workout days - no explanations or additional text outside the JSON string.no code block.",
  "user_data": {
    "unit": ${data.unit},
    "gender": ${data.gender},
    "age": ${data.age},
    "height": ${data.height},
    "weight": ${data.weight},
    "activityLevel": ${data.activityLevel},
    "goal": ${data.goal},
    "level": ${data.level},
    "equipments": ${data.equipments}
  },
  "exercise_list": [
    3/4 sit-up,45° side bend,air bike,alternate heel touchers,alternate lateral pulldown,assisted chest dip (kneeling),assisted hanging knee raise with throw down,assisted hanging knee raise,assisted lying leg raise with lateral throw down,assisted lying leg raise with throw down,assisted motion russian twist,assisted parallel close grip pull-up,assisted prone hamstring,assisted pull-up,assisted standing triceps extension (with towel),assisted triceps dip (kneeling),balance board,barbell pullover to press,barbell alternate biceps curl,barbell bench front squat,barbell bench press,barbell bench squat,barbell bent over row,barbell clean and press,barbell clean-grip front squat,barbell close-grip bench press,barbell curl,barbell deadlift,barbell decline bench press,barbell decline bent arm pullover,barbell decline close grip to skull press,barbell decline wide-grip press,barbell decline wide-grip pullover,barbell drag curl,barbell front chest squat,barbell front raise and pullover,barbell front raise,barbell front squat,barbell full squat,barbell good morning,barbell guillotine bench press,barbell hack squat,barbell incline bench press,barbell incline reverse-grip press,barbell incline row,barbell incline shoulder raise,barbell jefferson squat,barbell jm bench press,barbell jump squat,barbell lunge,barbell lying close-grip press,barbell lying close-grip triceps extension,barbell lying extension,barbell lying lifting (on hip),barbell lying preacher curl,barbell lying triceps extension skull crusher,barbell lying triceps extension,barbell narrow stance squat,barbell one arm bent over row,barbell one arm floor press,barbell one arm side deadlift,barbell one arm snatch,barbell one leg squat,barbell overhead squat,barbell preacher curl,barbell press sit-up,barbell prone incline curl,barbell pullover,barbell rack pull,barbell rear delt raise,barbell rear delt row,barbell rear lunge v. 2,barbell rear lunge,barbell revers wrist curl v. 2,barbell reverse curl,barbell reverse preacher curl,barbell reverse wrist curl,barbell rollerout from bench,barbell rollerout,barbell romanian deadlift,barbell seated behind head military press,barbell seated bradford rocky press,barbell seated calf raise,barbell seated close-grip concentration curl,barbell seated good morning,barbell seated overhead press,barbell seated overhead triceps extension,barbell seated twist,barbell shrug,barbell side bent v. 2,barbell side split squat v. 2,barbell side split squat,barbell single leg split squat,barbell skier,barbell speed squat,barbell squat (on knees),barbell standing ab rollerout,barbell standing back wrist curl,barbell standing bradford press,barbell standing close grip curl,barbell standing front raise over head,barbell standing leg calf raise,barbell standing overhead triceps extension,barbell standing reverse grip curl,barbell standing rocking leg calf raise,barbell standing twist,barbell standing wide-grip curl,barbell step-up,barbell stiff leg good morning,barbell straight leg deadlift,barbell sumo deadlift,barbell reverse grip bent over row,barbell upright row v. 2,barbell upright row,barbell upright row v. 3,barbell wide bench press,barbell wide-grip upright row,barbell wide squat,barbell wrist curl v. 2,barbell wrist curl,barbell zercher squat,battling ropes,bench dip (knees bent),bench hip extension,body-up,bottoms-up,biceps narrow pull-ups,biceps pull-up,cable alternate shoulder press,cable alternate triceps extension,cable bar lateral pulldown,cable bench press,cable concentration extension (on knee),cable cross-over lateral pulldown,cable cross-over revers fly,cable cross-over variation,cable deadlift,cable decline fly,cable decline seated wide-grip row,cable floor seated wide-grip row,cable forward raise,cable front raise,cable front shoulder raise,cable hammer curl (with rope),cable high row (kneeling),cable hip adduction,cable incline bench press,cable incline fly (on stability ball),cable incline fly,cable incline pushdown,cable incline triceps extension,cable judo flip,cable kneeling crunch,cable kneeling triceps extension,cable lateral pulldown (with rope attachment),cable lateral raise,cable low fly,cable low seated row,cable lying close-grip curl,cable lying extension pullover (with rope attachment),cable lying fly,cable lying triceps extension v. 2,cable middle fly,cable one arm bent over row,cable one arm curl,cable one arm lateral bent-over,cable one arm lateral raise,cable one arm straight back high row (kneeling),cable overhead triceps extension (rope attachment),cable preacher curl,cable pull through (with rope),cable pulldown (pro lat bar),cable pulldown,cable pushdown (straight arm) v. 2,cable pushdown (with rope attachment),cable pushdown,cable rear delt row (stirrups),cable rear delt row (with rope),cable rear drive,cable rear pulldown,cable reverse curl,cable reverse-grip pushdown,cable reverse-grip straight back seated high row,cable reverse preacher curl,cable reverse wrist curl,cable russian twists (on stability ball),cable seated crunch,cable seated high row (v-bar),cable seated one arm alternate row,cable seated rear lateral raise,cable seated shoulder internal rotation,cable seated wide-grip row,cable shoulder press,cable shrug,cable side bend crunch (bosu ball),cable side bend,cable side crunch,cable standing back wrist curl,cable standing cross-over high reverse fly,cable standing crunch,cable standing fly,cable standing hip extension,cable standing inner curl,cable standing lift,cable standing one arm triceps extension,cable standing pulldown (with rope),cable standing rear delt row (with rope),cable standing row (v-bar),cable standing shoulder external rotation,cable standing twist row (v-bar),cable straight arm pulldown (with rope),cable straight arm pulldown,cable straight back seated row,cable supine reverse fly,cable triceps pushdown (v-bar),cable tuck reverse crunch,cable twist,cable twisting pull,cable underhand pulldown,cable upright row,cable wrist curl,cambered bar lying row,chest dip,chin-ups (narrow parallel grip),circles knee stretch,clock push-up,close-grip push-up,cocoons,cross body crunch,crunch (hands overhead),crunch (on stability ball),crunch (on stability ball, arms straight),crunch floor,dead bug,decline crunch,decline push-up,decline sit-up,diamond push-up,donkey calf raise,dumbbell alternate biceps curl,dumbbell alternate side press,dumbbell arnold press v. 2,dumbbell around pullover,dumbbell bench press,dumbbell bench seated press,dumbbell bench squat,dumbbell one arm bent-over row,dumbbell bent over row,dumbbell biceps curl,dumbbell clean,dumbbell close-grip press,dumbbell concentration curl,dumbbell cross body hammer curl,dumbbell cuban press,dumbbell deadlift,dumbbell decline bench press,dumbbell decline fly,dumbbell decline hammer press,dumbbell decline shrug v. 2,dumbbell decline shrug,dumbbell decline triceps extension,dumbbell decline twist fly,dumbbell fly,dumbbell front raise v. 2,dumbbell front raise,dumbbell full can lateral raise,dumbbell hammer curl v. 2,dumbbell hammer curl,dumbbell incline bench press,dumbbell incline biceps curl,dumbbell incline breeding,dumbbell incline curl v. 2,dumbbell incline curl,dumbbell incline fly,dumbbell incline hammer curl,dumbbell incline hammer press,dumbbell incline inner biceps curl,dumbbell incline one arm lateral raise,dumbbell incline palm-in press,dumbbell incline raise,dumbbell incline rear lateral raise,dumbbell incline row,dumbbell incline shoulder raise,dumbbell incline shrug,dumbbell incline triceps extension,dumbbell incline twisted flyes,dumbbell iron cross,dumbbell kickback,dumbbell lateral raise,dumbbell lateral to front raise,dumbbell lunge,dumbbell lying extension (across face),dumbbell lying elbow press,dumbbell lying femoral,dumbbell lying hammer press,dumbbell lying one arm deltoid rear,dumbbell lying one arm press v. 2,dumbbell lying one arm press,dumbbell lying one arm pronated triceps extension,dumbbell lying one arm rear lateral raise,dumbbell lying one arm supinated triceps extension,dumbbell lying pronation,dumbbell lying rear lateral raise,dumbbell lying supination,dumbbell lying supine curl,dumbbell lying triceps extension,dumbbell neutral grip bench press,dumbbell one arm concentration curl (on stability ball),dumbbell one arm kickback,dumbbell one arm lateral raise,dumbbell one arm lateral raise with support,dumbbell one arm reverse wrist curl,dumbbell one arm reverse fly (with support),dumbbell one arm shoulder press v. 2,dumbbell one arm shoulder press,dumbbell one arm triceps extension (on bench),dumbbell one arm upright row,dumbbell one arm wrist curl,dumbbell over bench neutral wrist curl,dumbbell over bench one arm neutral wrist curl,dumbbell over bench one arm wrist curl,dumbbell over bench revers wrist curl,dumbbell over bench wrist curl,dumbbell peacher hammer curl,dumbbell plyo squat,dumbbell preacher curl,dumbbell pronate-grip triceps extension,dumbbell prone incline curl,dumbbell pullover,dumbbell raise,dumbbell rear delt row_shoulder,dumbbell rear fly,dumbbell rear lateral raise (support head),dumbbell rear lateral raise,dumbbell rear lunge,dumbbell revers grip biceps curl,dumbbell reverse fly,dumbbell reverse preacher curl,dumbbell reverse wrist curl,dumbbell rotation reverse fly,dumbbell seated alternate front raise,dumbbell seated alternate press,dumbbell seated bench extension,dumbbell seated biceps curl (on stability ball),dumbbell seated curl,dumbbell seated front raise,dumbbell seated inner biceps curl,dumbbell seated kickback,dumbbell seated lateral raise v. 2,dumbbell seated lateral raise,dumbbell seated neutral wrist curl,dumbbell seated one arm kickback,dumbbell seated one arm rotate,dumbbell seated one leg calf raise,dumbbell seated palms up wrist curl,dumbbell seated preacher curl,dumbbell seated revers grip concentration curl,dumbbell seated shoulder press (parallel grip),dumbbell seated shoulder press,dumbbell shrug,dumbbell side bend,dumbbell side lying one hand raise,dumbbell single leg calf raise,dumbbell single leg split squat,dumbbell single leg squat,dumbbell squat,dumbbell standing alternate overhead press,dumbbell standing alternate raise,dumbbell standing biceps curl,dumbbell standing calf raise,dumbbell standing concentration curl,dumbbell standing front raise above head,dumbbell standing kickback,dumbbell standing one arm concentration curl,dumbbell standing one arm curl (over incline bench),dumbbell standing one arm extension,dumbbell standing one arm palm in press,dumbbell standing one arm reverse curl,dumbbell standing overhead press,dumbbell standing palms in press,dumbbell standing preacher curl,dumbbell standing reverse curl,dumbbell standing triceps extension,dumbbell step-up,dumbbell stiff leg deadlift,dumbbell straight arm pullover,dumbbell straight leg deadlift,dumbbell tate press,dumbbell upright row,dumbbell w-press,dumbbell zottman curl,elbow-to-knee,ez barbell anti gravity press,ez barbell close-grip curl,ez barbell curl,ez barbell decline close grip face press,ez barbell incline triceps extension,ez barbell jm bench press,ez barbell reverse grip curl,ez barbell reverse grip preacher curl,ez barbell seated triceps extension,ez barbell spider curl,finger curls,flexion leg sit up (bent knee),flexion leg sit up (straight arm),floor fly (with barbell),flutter kicks,front plank with twist,gironda sternum chin,gorilla chin,groin crunch,handstand push-up,hanging leg raise,hanging pike,hanging straight leg hip raise,hanging straight leg raise,hanging straight twisting leg hip raise,hip raise (bent knee),hyperextension (on bench),hyperextension,incline close-grip push-up,incline leg hip raise (leg straight),incline push up depth jump,incline push-up,incline reverse grip push-up,incline twisting sit-up,inverse leg curl (bench support),inverted row v. 2,inverted row with straps,inverted row,isometric wipers,jack burpee,jackknife sit-up,janda sit-up,jump squat v. 2,jump squat,kettlebell advanced windmill,kettlebell alternating hang clean,kettlebell alternating press on floor,kettlebell alternating press,kettlebell alternating renegade row,kettlebell alternating row,kettlebell arnold press,kettlebell bent press,kettlebell bottoms up clean from the hang position,kettlebell double alternating hang clean,kettlebell double jerk,kettlebell double push press,kettlebell double snatch,kettlebell double windmill,kettlebell extended range one arm press on floor,kettlebell figure 8,kettlebell front squat,kettlebell goblet squat,kettlebell hang clean,kettlebell lunge pass through,kettlebell one arm clean and jerk,kettlebell one arm jerk,kettlebell one arm military press to the side,kettlebell one arm push press,kettlebell one arm row,kettlebell one arm snatch,kettlebell pirate supper legs,kettlebell pistol squat,kettlebell plyo push-up,kettlebell seated press,kettlebell seesaw press,kettlebell sumo high pull,kettlebell swing,kettlebell thruster,kettlebell turkish get up (squat style),kettlebell two arm clean,kettlebell two arm military press,kettlebell windmill,kick out sit,kipping muscle up,landmine 180,leg pull in flat bench,lever alternating narrow grip seated row,lever assisted chin-up,lever back extension,lever bent over row,lever bicep curl,lever chest press,lever chest press,lever deadlift,lever front pulldown,lever gripless shrug,lever high row,lever kneeling leg curl,lever kneeling twist,lever lateral raise,lever leg extension,lever lying leg curl,lever military press,lever narrow grip seated row,lever one arm bent over row,lever one arm shoulder press,lever overhand triceps dip,lever preacher curl,lever reverse hyperextension,lever seated calf raise,lever seated crunch (chest pad),lever seated fly,lever seated hip abduction,lever seated hip adduction,lever seated leg curl,lever seated leg raise crunch,lever seated reverse fly (parallel grip),lever seated reverse fly,lever shoulder press,lever shrug,lever standing calf raise,lever t bar row,lever triceps extension,london bridge,lying (side) quads stretch,lying leg raise flat bench,march sit (wall),mixed grip chin-up,monster walk,mountain climber,muscle up,negative crunch,oblique crunches floor,olympic barbell hammer curl,olympic barbell triceps extension,one arm chin-up,one arm dip,one arm slam (with medicine ball),otis up,outside leg kick push-up,overhead triceps stretch,power clean,pull-in (on stability ball),pull up (neutral grip),pull-up,push-up (bosu ball),push-up (on stability ball),push-up (on stability ball),push-up (wall) v. 2,push-up (wall),push-up close-grip off dumbbell,push-up inside leg kick,push-up,push-up medicine ball,push-up to side plank,raise single arm push-up,rear decline bridge,rear deltoid stretch,rear pull-up,reverse dip,reverse grip machine lat pulldown,reverse grip pull-up,reverse hyper extension (on stability ball),ring dips,rocky pull-up pulldown,rope climb,run (equipment),run,russian twist,scapular pull-up,seated leg raise,seated lower back stretch,seated side crunch (wall),self assisted inverse leg curl (on floor),self assisted inverse leg curl,shoulder tap push-up,side bridge v. 2,side hip (on parallel bars),side hip abduction,side push neck stretch,side push-up,side-to-side chin,side wrist pull stretch,single arm push-up,single leg calf raise (on a dumbbell),single leg platform slide,sit-up v. 2,sled 45в° calf press,sled 45в° leg press,sled 45в° leg wide press,sled closer hack squat,sled forward angled calf raise,sled hack squat,sled lying squat,smith back shrug,smith behind neck press,smith bench press,smith bent knee good morning,smith chair squat,smith close-grip bench press,smith deadlift,smith decline bench press,smith decline reverse-grip press,smith hack squat,smith hip raise,smith incline bench press,smith incline reverse-grip press,smith incline shoulder raises,smith leg press,smith narrow row,smith rear delt row,smith reverse calf raises,smith reverse-grip press,smith seated shoulder press,smith shoulder press,smith shrug,smith single leg split squat,smith sprint lunge,smith squat,smith standing back wrist curl,smith standing behind head military press,smith standing leg calf raise,smith standing military press,smith upright row,snatch pull,spell caster,spider crawl push up,squat jerk,standing behind neck press,standing lateral stretch,standing single leg curl,standing wheel rollerout,stationary bike walk,superman push-up,suspended abdominal fallout,suspended push-up,suspended reverse crunch,suspended row,suspended split squat,trap bar deadlift,triceps dip (bench leg),triceps dip (between benches),triceps dip,triceps dips floor,triceps press,triceps stretch,twin handle parallel grip lat pulldown,vertical leg raise (on parallel bars),weighted bench dip,weighted crunch,weighted donkey calf raise,weighted front raise,weighted hyperextension (on stability ball),weighted overhead crunch (on stability ball),weighted pull-up,weighted round arm,weighted russian twist (legs up),weighted russian twist,weighted seated bicep curl (on stability ball),weighted seated twist (on stability ball),weighted side bend (on stability ball),weighted sissy squat,weighted squat,weighted standing curl,weighted standing hand squeeze,weighted svend press,wheel rollerout,wind sprints,wrist rollerer,cable kickback,cable seated row,cable twist (up-down),dumbbell lying external shoulder rotation,dumbbell upright shoulder external rotation,lying leg-hip raise,weighted hanging leg-hip raise,cable curl,lever shoulder press v. 2,butt-ups,tuck crunch,reverse crunch,cable reverse crunch,cable standing crunch (with rope attachment),band alternating biceps curl,band alternating v-up,band assisted pull-up,band assisted wheel rollerout,band bicycle crunch,band close-grip pulldown,band close-grip push-up,band concentration curl,band front lateral raise,band front raise,band horizontal pallof press,band bent-over hip extension,band jack knife sit-up,band kneeling one arm pulldown,band lying hip internal rotation,band kneeling twisting crunch,band one arm overhead biceps curl,band one arm single leg split squat,band one arm standing low row,band one arm twisting chest press,band one arm twisting seated row,band pull through,band push sit-up,band reverse fly,band reverse wrist curl,band seated hip internal rotation,band shoulder press,band side triceps extension,band single leg calf raise,band single leg reverse calf raise,band single leg split squat,band lying straight leg raise,band squat row,band squat,band standing crunch,band standing twisting crunch,band step-up,band stiff leg deadlift,band straight leg deadlift,band seated twist,band twisting overhead press,band underhand pulldown,band v-up,band vertical pallof press,band wrist curl,band y-raise,band shrug,band standing rear delt row,band straight back stiff leg deadlift,burpee,dynamic chest stretch (male),dumbbell burpee,lever donkey calf raise,band bench press,barbell decline pullover,barbell reverse grip decline bench press,barbell reverse grip incline bench press,barbell wide reverse grip bench press,behind head chest stretch,cable decline one arm press,cable decline press,cable one arm decline chest fly,cable one arm fly on exercise ball,cable one arm incline fly on exercise ball,cable one arm incline press,cable one arm incline press on exercise ball,cable one arm press on exercise ball,cable press on exercise ball,cable standing up straight crossovers,cable upper chest crossovers,chest and front of shoulder stretch,chest stretch with exercise ball,clap push up,deep push up,drop push up,dumbbell decline one arm fly,dumbbell fly on exercise ball,dumbbell incline fly on exercise ball,dumbbell incline one arm fly,dumbbell incline one arm fly on exercise ball,dumbbell incline one arm press,dumbbell incline one arm press on exercise ball,dumbbell incline press on exercise ball,dumbbell lying pullover on exercise ball,dumbbell one arm bench fly,dumbbell one arm chest fly on exercise ball,dumbbell one arm decline chest press,dumbbell one arm fly on exercise ball,dumbbell one arm incline chest press,dumbbell one arm press on exercise ball,dumbbell one arm pullover on exercise ball,dumbbell one leg fly on exercise ball,dumbbell press on exercise ball,dumbbell pullover hip extension on exercise ball,dumbbell pullover on exercise ball,exercise ball pike push up,isometric chest squeeze,kettlebell one arm floor press,lever incline chest press,lever decline chest press,machine inner chest press,medicine ball chest pass,medicine ball chest push from 3 point stance,medicine ball chest push multiple response,medicine ball chest push single response,plyo push up,push up on bosu ball,smith wide grip bench press,smith wide grip decline bench press,weighted drop push up,wide hand push up,medicine ball chest push with run release,lever unilateral row,back extension on exercise ball,barbell bent arm pullover,barbell reverse grip incline bench row,cable incline bench row,cable palm rotational row,cable rope crossover seated row,cable rope elevated seated row,cable rope extension incline bench row,cable rope seated row,cable upper row,cable wide grip rear pulldown behind neck,chin-up,close grip chin-up,dumbbell lying rear delt row,dumbbell palm rotational bent over row,dumbbell reverse grip incline bench one arm row,dumbbell reverse grip incline bench two arm row,exercise ball alternating arm ups,exercise ball back extension with arms extended,exercise ball back extension with hands behind head,exercise ball back extension with knees off ground,exercise ball back extension with rotation,exercise ball hug,exercise ball lat stretch,exercise ball lower back stretch (pyramid),exercise ball lying side lat stretch,exercise ball prone leg raise,ez bar reverse grip bent over row,kettlebell two arm row,kneeling lat stretch,lever one arm lateral wide pulldown,lever reverse grip vertical row,lever reverse t-bar row,lever seated row,lever t-bar reverse grip row,lower back curl,medicine ball catch and overhead throw,medicine ball overhead slam,one arm against wall,lever one arm lateral high row,side lying floor stretch,smith bent over row,smith one arm row,smith reverse grip bent over row,sphinx,spine stretch,standing pelvic tilt,upper back stretch,upward facing dog,wide grip rear pull-up,ankle circles,band two legs calf raise - (band under both legs) v. 2,barbell floor calf raise,barbell seated calf raise,barbell standing calf raise,bodyweight standing calf raise,box jump down with one leg stabilization,cable standing calf raise,cable standing one leg calf raise,calf stretch with hands against wall,calf stretch with rope,dumbbell seated calf raise,dumbbell seated one leg calf raise - hammer grip,dumbbell seated one leg calf raise - palm up,exercise ball on the wall calf raise,hack calf raise,hack one leg calf raise,lever seated squat calf raise on leg press machine,one leg donkey calf raise,one leg floor calf raise,peroneals stretch,posterior tibialis stretch,seated calf stretch (male),sled calf press on leg press,sled one leg calf press on leg press,smith one leg floor calf raise,smith reverse calf raises,smith seated one leg calf raise,smith toe raise,standing calves,standing calves calf stretch,bench dip on floor,muscle-up (on vertical bar),neck side stretch,back pec stretch,calf push stretch with hands against wall,band hip lift,barbell glute bridge,barbell lateral lunge,barbell palms down wrist curl over a bench,barbell palms up wrist curl over a bench,cable reverse one arm curl,dumbbell one arm reverse preacher curl,dumbbell one arm seated neutral wrist curl,exercise ball one leg prone lower body rotation,exercise ball one legged diagonal kick hamstring curl,hug keens to chest,iron cross stretch,kneeling jump squat,modified push up to lower arms,pelvic tilt into bridge,reverse hyper on flat bench,seated glute stretch,sled 45 degrees one leg press,smith seated wrist curl,straight leg outer hip abductor,wrist circles,wide grip pull-up,chest dip (on dip-pull-up cage),assisted standing chin-up,assisted standing pull-up,smith front squat (clean grip),smith low bar squat,barbell low bar squat,barbell high bar squat,dumbbell finger curls,kettlebell seated two arm military press,lever gripless shrug v. 2,dumbbell over bench one arm reverse wrist curl,lever seated dip,lever seated crunch,barbell standing close grip military press,barbell standing wide military press,ez barbell seated curls,dumbbell romanian deadlift,walking lunge,barbell full squat (back pov),barbell full squat (side pov),sled 45° leg press (side pov),sled 45в° leg press (back pov),twist hip lift,push-up on lower arms,crab twist toe touch,inchworm,forward jump,backward jump,one leg squat,lever incline chest press v. 2,sissy squat,standing calf raise (on a staircase),butterfly yoga pose,oblique crunch v. 2,sledge hammer,hamstring stretch,all fours squad stretch,barbell full zercher squat,chair leg extended stretch,exercise ball hip flexor stretch,exercise ball seated hamstring stretch,intermediate hip flexor and quad stretch,leg up hamstring stretch,reclining big toe pose with rope,runners stretch,seated wide angle pose sequence,standing hamstring and calf stretch with strap,world greatest stretch,lever preacher curl v. 2,lever hammer grip preacher curl,lever reverse grip preacher curl,dumbbell decline one arm hammer press,dumbbell incline hammer press on exercise ball,dumbbell incline one arm hammer press,dumbbell incline one arm hammer press on exercise ball,dumbbell one arm hammer press on exercise ball,dumbbell one arm reverse grip press,dumbbell palms in incline bench press,dumbbell reverse bench press,smith machine decline close grip bench press,smith machine reverse decline close grip bench press,ez barbell close grip preacher curl,ez barbell spider curl,barbell standing wide grip biceps curl,cable close grip curl,cable concentration curl,cable drag curl,cable one arm preacher curl,cable lying bicep curl,cable one arm reverse preacher curl,cable overhead curl,cable overhead curl on exercise ball,cable pulldown bicep curl,cable rope hammer preacher curl,cable rope one arm hammer preacher curl,cable seated curl,cable seated one arm concentration curl,cable seated overhead curl,cable squatting curl,cable two arm curl on incline bench,dumbbell alternate hammer preacher curl,dumbbell alternate preacher curl,dumbbell alternate seated hammer curl,dumbbell alternating bicep curl with leg raised on exercise ball,dumbbell alternating seated bicep curl on exercise ball,dumbbell bicep curl lunge with bowling motion,dumbbell bicep curl on exercise ball with leg raised,dumbbell bicep curl with stork stance,dumbbell biceps curl reverse,dumbbell biceps curl squat,dumbbell biceps curl v sit on bosu ball,dumbbell cross body hammer curl v. 2,dumbbell lunge with bicep curl,dumbbell hammer curl on exercise ball,dumbbell kneeling bicep curl exercise ball,dumbbell lying supine biceps curl,dumbbell lying wide curl,dumbbell one arm hammer preacher curl,dumbbell high curl,dumbbell one arm prone curl,dumbbell one arm prone hammer curl,dumbbell one arm reverse spider curl,dumbbell one arm seated bicep curl on exercise ball,dumbbell one arm seated hammer curl,dumbbell one arm standing curl,dumbbell one arm standing hammer curl,dumbbell one arm zottman preacher curl,dumbbell preacher curl over exercise ball,dumbbell prone incline hammer curl,dumbbell reverse spider curl,dumbbell seated alternate hammer curl on exercise ball,dumbbell seated bicep curl,dumbbell seated hammer curl,dumbbell seated one arm bicep curl on exercise ball with leg raised,dumbbell standing one arm curl over incline bench,ez bar seated close grip concentration curl,smith machine bicep curl,dumbbell step up single leg balance with bicep curl,squat to overhead reach,squat to overhead reach with twist,posterior step to overhead reach,lunge with twist,push and pull bodyweight,dumbbell push press,medicine ball close grip push up,squat on bosu ball,prone twist on stability ball,assisted lying calves stretch,assisted lying glutes stretch,assisted lying gluteus and piriformis stretch,assisted side lying adductor stretch,assisted prone lying quads stretch,assisted prone rectus femoris stretch,assisted seated pectoralis major stretch with stability ball,cable squat row (with rope attachment),barbell seated close grip behind neck triceps extension,barbell incline close grip bench press,barbell lying back of the head tricep extension,barbell reverse grip skullcrusher,cable high pulley overhead tricep extension,cable one arm tricep pushdown,cable rope high pulley overhead tricep extension,cable rope incline tricep extension,cable rope lying on floor tricep extension,cable standing reverse grip one arm overhead tricep extension,cable two arm tricep kickback,dumbbell lying alternate extension,dumbbell seated bent over alternate kickback,dumbbell close grip press,dumbbell forward lunge triceps extension,dumbbell incline two arm extension,dumbbell kickbacks on exercise ball,dumbbell lying single extension,dumbbell one arm french press on exercise ball,dumbbell seated bent over triceps extension,dumbbell seated reverse grip one arm overhead tricep extension,dumbbell standing alternating tricep kickback,dumbbell standing bent over one arm triceps extension,dumbbell standing bent over two arm triceps extension,dumbbell tricep kickback with stork stance,dumbbell twisting bench press,exercise ball dip,exercise ball seated triceps stretch,exercise ball supine triceps extension,ez bar french press on exercise ball,ez bar lying close grip triceps extension behind head,ez bar standing french press,medicine ball supine chest throw,barbell pin presses,smith machine incline tricep extension,three bench dip,weighted three bench dips,weighted tricep dips,barbell single leg deadlift,dumbbell single leg deadlift,assisted sit-up,single leg squat (pistol) male,dumbbell goblet squat,hanging oblique knee raise,shoulder grip pull-up,hanging leg hip raise,dumbbell upright row (back pov),self assisted inverse leg curl,weighted triceps dip on high parallel bars,bodyweight side lying biceps curl,biceps leg concentration curl,bodyweight kneeling triceps extension,elbow lift - reverse push-up,one arm towel row,side bridge hip abduction,side plank hip adduction,farmers walk,weighted front plank,dumbbell cuban press v. 2,dumbbell arnold press,stationary bike run v. 3,hands bike,walk elliptical cross trainer,ski ergometer,dumbbell standing around world,cable seated chest press,ez barbell decline triceps extension,barbell reverse close-grip bench press,dumbbell seated triceps extension,dumbbells seated triceps extension,roller hip stretch,roller seated shoulder flexor depresor retractor,roller body saw,roller hip lat stretch,roller reverse crunch,roller side lat stretch,roller back stretch,roller seated single leg shoulder flexor depresor retractor,left hook. boxing,lever pullover,lever hip extension v. 2,lever alternate leg press,lever gripper hands,lever calf press,dumbbell rear delt raise,dumbbell standing zottman preacher curl,dumbbell zottman preacher curl,stability ball crunch (full range hands behind head),inverted row on bench,inverted row bent knees,walking on stepmill,lying elbow to knee,lever rotary calf,dumbbell seated bent arm lateral raise,lever shoulder press v. 3,dumbbell standing inner biceps curl v. 2,dumbbell reverse grip row (female),narrow push-up on exercise ball,spine twist,cable lat pulldown full range of motion,cycle cross trainer,arm slingers hanging straight legs,sled lying calf press,lever seated calf press,arm slingers hanging bent knee legs,wide-grip chest dip on high parallel bars,assisted wide-grip chest dip (kneeling),split squats,weighted russian twist v. 2,dumbbell scott press,close-grip push-up (on knees),cable seated twist,inverse leg curl (on pull-up cable machine),dumbbell biceps curl (with arm blaster),dumbbell hammer curls (with arm blaster),dumbbell alternate biceps curl (with arm blaster),ez-bar biceps curl (with arm blaster),cable triceps pushdown (v-bar) (with arm blaster),cable reverse grip triceps pushdown (sz-bar) (with arm blaster),barbell biceps curl (with arm blaster),barbell standing concentration curl,frog crunch,ez-bar close-grip bench press,tire flip,chest dip on straight bar,cable thibaudeau kayak row,bridge - mountain climber (cross body),dumbbell lying on floor rear delt raise,seated piriformis stretch,rocking frog stretch,lever horizontal one leg press,jump rope,cable lateral pulldown with v-bar,dumbbell lying pronation on floor,dumbbell lying supination on floor,lever reverse grip lateral pulldown,ez-barbell standing wide grip biceps curl,dumbbell step-up lunge,barbell squat jump step rear lunge,barbell sitted alternate leg raise,barbell sitted alternate leg raise (female),twisted leg raise (female),twisted leg raise,dumbbell supported squat,dumbbell single leg deadlift with stepbox support,dumbbell sumo pull through,barbell split squat v. 2,dumbbell step-up split squat,captains chair straight leg raise,weighted close grip chin-up on dip cage,resistance band seated hip abduction,resistance band leg extension,ez bar lying bent arms pullover,incline scapula push up,scapula dips,low glute bridge on floor,curl-up,barbell pendlay row,bench pull-ups,scapula push-up,band fixed back underhand pulldown,band fixed back close grip pulldown,potty squat,resistance band seated shoulder press,resistance band seated biceps curl,resistance band seated chest press,potty squat with support,smith sumo squat,resistance band seated straight back row,push-up plus,pelvic tilt,bodyweight standing close-grip one arm row,bodyweight standing close-grip row,bodyweight standing one arm row (with towel),bodyweight standing one arm row,bodyweight standing row (with towel),bodyweight standing row,bodyweight squatting row (with towel),bodyweight squatting row,glute-ham raise,frankenstein squat,lever lying two-one leg curl,lever bent-over row with v-bar,quarter sit-up,half sit-up (male),prisoner half sit-up (male),arms overhead full sit-up (male),kneeling push-up (male),basic toe touch (male),side-to-side toe touch (male),arms apart circular toe touch (male),hands reversed clasped circular toe touch (male),chest tap push-up (male),modified hindu push-up (male),hands clasped circular toe touch (male),scissor jumps (male),astride jumps (male),half knee bends (male),semi squat jump (male),star jump (male),jack jump (male),two toe touch (male),hyght dumbbell fly,cable assisted inverse leg curl,resistance band hip thrusts on knees (female),landmine lateral raise,kneeling plank tap shoulder (male),exercise ball on the wall calf raise (tennis ball between knees),exercise ball on the wall calf raise (tennis ball between ankles),smith full squat,weighted muscle up,elbow dips,korean dips,impossible dips,weighted one hand pull up,stalder press,elevator,archer pull up,archer push up,front lever reps,front lever,back lever,straddle planche,full planche,lean planche,frog planche,handstand,flag,skin the cat,barbell thruster,weighted muscle up (on bar),weighted straight bar dip,straddle maltese,full maltese,swing 360,full planche push-up,bear crawl,skater hops,l-pull-up,l-sit on floor,v-sit on floor,swimmer kicks v. 2 (male),forward lunge (male),glute bridge two legs on bench (male),quads,dumbbell incline y-raise,dumbbell incline t-raise,bodyweight drop jump squat,bodyweight incline side plank,dumbbell incline alternate press,dumbbell seated alternate shoulder,dumbbell seated biceps curl to shoulder press,dumbbell single arm overhead carry,quick feet v. 2,dumbbell standing alternate hammer curl and press,glute bridge march,barbell glute bridge two legs on bench (male),cable one arm pulldown,lunge with jump,dumbbell contralateral forward lunge,high knee against wall,wheel run,push to run,bent knee lying twist (male),knee touch crunch,weighted kneeling step with swing,weighted stretch lunge,weighted cossack squats (male),weighted lunge with swing,single leg bridge with outstretched leg,walking high knees lunge,short stride run,pike-to-cobra push-up,reverse plank with leg lift,dumbbell side plank with rear fly,power point plank,walking on incline treadmill,side lying hip adduction (male),standing archer,weighted decline sit-up,ski step,back and forth step,sit-up with arms on chest,cable kneeling rear delt row (with rope) (male),inchworm v. 2,shoulder tap,lever standing chest press,lever seated good morning,lever seated crunch v. 2,curtsey squat,incline push-up (on box),dumbbell one arm snatch,dumbbell waiter biceps curl
  ],
  "processing_rules": {
    "days_calculation": "${Number(data.activityLevel) + 2} days (min 2, max 6)",
    "exercise_selection": {
      "strength": {
        "sets": "${data.level === 'beginner' ? 3 : data.level === 'intermediate' ? 4 : 5}",
        "reps": "${data.goal === 'muscle gain' ? '8-12' : data.goal === 'stronger' ? '4-6' : '12-15'}"
      },
      "cardio": {
        "duration": "${data.goal === 'reduce bodyWeight' ? '15-20 mins' : '10-15 mins'}"
      }
    },
    "muscle_targeting": {
      "daily": ["1 push", "1 pull", "1 legs", "1 core"],
      "weekly_balance": {
        "push": "2-3 days",
        "pull": "2-3 days", 
        "legs": "2-3 days"
      }
    }
  },
  "complete_example": {
    "input": {
      "unit": "metric",
      "gender": "male",
      "age": 30,
      "height": 175,
      "weight": 80,
      "activityLevel": "2",
      "goal": "muscle gain",
      "level": "intermediate",
      "equipments": 5
    },
    "output": [
      {
      "Day": "1",
      "exercise": [
        {
          "name": "air bike",
          "time": "5 minutes"
        },
        {
          "name": "barbell bench press",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "pectorals"
        },
        {
          "name": "barbell bent over row",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "lats"
        },
        {
          "name": "barbell squat",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "quads"
        },
        {
          "name": "dumbbell biceps curl",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "biceps"
        },
        {
          "name": "cable pushdown",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "triceps"
        },
        {
          "name": "hanging leg raise",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "abs"
        },
        {
          "name": "standing calves",
          "time": "5 minutes"
        }
      ]
    },
    {
      "Day": "2",
      "exercise": [
        {
          "name": "run",
          "time": "10 minutes"
        },
        {
          "name": "dumbbell incline bench press",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "pectorals"
        },
        {
          "name": "pull-up",
          "Set": "4",
          "Reps": "6",
          "targetedMuscle": "lats"
        },
        {
          "name": "barbell deadlift",
          "Set": "4",
          "Reps": "6",
          "targetedMuscle": "hamstrings"
        },
        {
          "name": "dumbbell lateral raise",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "delts"
        },
        {
          "name": "dumbbell lying triceps extension",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "triceps"
        },
        {
          "name": "russian twist",
          "Set": "3",
          "Reps": "12",
          "targetedMuscle": "abs"
        },
        {
          "name": "seated calf stretch",
          "time": "5 minutes"
        }
      ]
    },
    {
      "Day": "3",
      "exercise": [
        {
          "name": "flutter kicks",
          "time": "5 minutes"
        },
        {
          "name": "barbell overhead press",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "delts"
        },
        {
          "name": "chin-ups (narrow parallel grip)",
          "Set": "4",
          "Reps": "6",
          "targetedMuscle": "biceps"
        },
        {
          "name": "barbell front squat",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "quads"
        },
        {
          "name": "dumbbell rear delt raise",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "upper back"
        },
        {
          "name": "cable overhead triceps extension (rope attachment)",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "triceps"
        },
        {
          "name": "decline crunch",
          "Set": "3",
          "Reps": "12",
          "targetedMuscle": "abs"
        },
        {
          "name": "lying leg raise flat bench",
          "time": "5 minutes"
        }
      ]
    },
    {
      "Day": "4",
      "exercise": [
        {
          "name": "walk elliptical cross trainer",
          "time": "15 minutes"
        },
        {
          "name": "dumbbell bench press",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "pectorals"
        },
        {
          "name": "cable seated row",
          "Set": "4",
          "Reps": "8",
          "targetedMuscle": "lats"
        },
        {
          "name": "barbell lunge",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "glutes"
        },
        {
          "name": "cable lateral raise",
          "Set": "3",
          "Reps": "10",
          "targetedMuscle": "delts"
        },
        {
          "name": "close-grip push-up",
          "Set": "3",
          "Reps": "12",
          "targetedMuscle": "triceps"
        },
        {
          "name": "45° side bend",
          "Set": "3",
          "Reps": "12",
          "targetedMuscle": "obliques"
        },
        {
          "name": "standing calves",
          "time": "5 minutes"
        }
      ]
    }
  ],
  "validation": {
    "required": [
      "exact_exercise_names_from_list",
      "proper_equipment_usage",
      "goal_alignment",
      "level_appropriate_volume"
    ],
    "forbidden": [
      "custom_exercises",
      "missing_muscle_groups", 
      "exceeding_time_limits",
      "exercise_repetition_across_days"
    ],
    "time_checks": {
      "max_total_daily": 90,
      "warmup_cooldown": "5-10 mins total",
      "strength_block": "45-60 mins",
      "cardio_block": "10-20 mins"
    }
  },
  "output_requirements": {
    "structure": {
      "daily": [
        "1 warmup (3-5 mins)",
        "5-6 strength/cardio",
        "1 cooldown (3-5 mins)"
      ],
      "weekly": [
        "Push/pull/legs balance",
        "Core 4-5x/week",
        "No back-to-back same muscle groups"
      ]
    },
    "format": {
      "field_casing": "lowercase",
      "time_units": "minutes",
      "muscle_names": "exact from list"
    }
  }
}`
              }
            ],
            provider: "nebius",
            temperature: 1.0,
            max_tokens: 2048,
            top_p: 0.7,
          });
          const parsedPlan = JSON.parse(chatCompletion.choices[0].message.content);
          console.log(parsedPlan);
          setPlan(parsedPlan);
          if (!localStorage.getItem("Plan")) {
            localStorage.setItem("Plan", JSON.stringify(parsedPlan));
            window.location.reload();
          }
        } catch (err) {
          setPlan(null);
        }
      };
      fetchFitnessRoutine();
    }
  }, [data]);

  return (
    
    <div style={styledDaySchedule} >
      <h1 style={styledheader} className={outfit.className}>AI Generated Daily Exercise Routine</h1>

    <div style={buttonContainer}>
      <div style={buttonContentStyle}>

      {plan && plan.map((day, index) => (
        <button
        key={index}
        className={`calculateButton ${outfit.className}`}
        onClick={() => {
          if (selectedDay === index && instruction !== "") {
            showInstruction(""); 
          } 
          else {
            setSelectedDay(index);
            showInstruction(""); 
          }
        }}
      >
          Day {day.Day}
        </button>
      ))}
      {!plan && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      </div>
    </div>

    <AnimatePresence mode="wait">
      {(instruction === "" && selectedDay !== null ) && (
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={exercisesContainerStyle}
        >
          <h2 className={outfit.className}>Day {plan[selectedDay].Day} Exercises</h2>
          {(plan[selectedDay].exercise.map((ex, i) => (
            <div key={i} className="exerciseCard" onClick={()=>showInstruction2(ex.name,ex.mainMuscle)}>
              <strong className={outfit.className}
              >{titleCase(ex.name)}
              </strong><br />
              {ex.time ? (
                <span >Time: {ex.time}</span>
              ) : (
                <>
                  <span >Sets: {ex.Set} | Reps: {ex.Reps}</span><br />
                </>
              )}
            </div>
          )))}
        </motion.div>
      )}
      {(instruction !== "" && selectedDay !== null) && (
        <div>
          <div style={instructionsContainerStyle}>
          <div>
            <h1 className={outfit.className} style={title}>{titleCase(instruction)}</h1>
            
            <div style={graphics}>
              <img 
                src={image} 
                style={imageStyle}
              />
              {/* <Body targetMuscle={targetMuscle} /> */}
            </div>

            

            <div>
              <h2>Instructions</h2>
              <ol>
                {muscles.map((step, index) => (
                  <li key={index}>
                    {(index+ 1)+". "+step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          </div>
          <div onClick={()=>showInstruction("")} className={`calculateButton ${outfit.className}`} style={buttonBack}>
            Back
          </div>
        </div>
      )}

    </AnimatePresence>

    </div>
  );
}
