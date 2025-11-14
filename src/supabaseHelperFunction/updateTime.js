//functions updating the user's logged time
import supabase from "./supabase-client";

const mockNewChore={
    //this would be coming from Chore Input Form
    name: "Joe",
    startedAt: 1700000000, //timestamp in milliseconds
    endedAt: 1700000000, //timestamp in millisecond
}

//rough draft of update function
async function updateChore(newChore){
    const {  data: userData, error: userError } = await supabase
    .from('user')
    .select('id')
    .eq('name', newChore.name)
    .single();

if (userError || !userData) {
    console.error('User not found');
    return;
 }

const startedAt = newChore.startedAt;
const endedAt = newChore.endedAt;
const durationSeconds = Math.floor((endedAt - startedAt) / 1000);

const { data: sessionData, error: sessionError } = await supabase
  .from('chore_session')
  .insert({
    user_id: userData.id,
    started_at: startedAt.toISOString(),
    ended_at: endedAt.toISOString(),
    duration_seconds: durationSeconds
  })
  .select();

}