-- Enable RLS on all tables
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE macrocycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mesocycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE microcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE planned_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE performed_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performed_sets ENABLE ROW LEVEL SECURITY;

-- Create a function to check if user is a coach or the owner
CREATE OR REPLACE FUNCTION is_coach_or_owner(resource_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the user is the owner OR if the user has a 'coach' role in public.users
  -- Note: This assumes a public.users table exists and is synced with auth.users
  RETURN auth.uid() = resource_user_id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'coach'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for Seasons
CREATE POLICY "Coaches can view all seasons they created" ON seasons
  FOR SELECT USING (auth.uid() = coach_id);

CREATE POLICY "Coaches can insert seasons" ON seasons
  FOR INSERT WITH CHECK (auth.uid() = coach_id);

CREATE POLICY "Coaches can update their seasons" ON seasons
  FOR UPDATE USING (auth.uid() = coach_id);

CREATE POLICY "Athletes can view seasons assigned to them" ON seasons
  FOR SELECT USING (auth.uid() = athlete_id);

-- Policies for Macrocycles (Cascade from Season)
CREATE POLICY "Users can view macrocycles if they can view the season" ON macrocycles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM seasons WHERE seasons.id = macrocycles.season_id AND (seasons.coach_id = auth.uid() OR seasons.athlete_id = auth.uid()))
  );

CREATE POLICY "Coaches can manage macrocycles" ON macrocycles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM seasons WHERE seasons.id = macrocycles.season_id AND seasons.coach_id = auth.uid())
  );

-- Policies for Mesocycles (Cascade from Macrocycle)
CREATE POLICY "Users can view mesocycles if they can view the macrocycle" ON mesocycles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM macrocycles
      JOIN seasons ON seasons.id = macrocycles.season_id
      WHERE macrocycles.id = mesocycles.macrocycle_id
      AND (seasons.coach_id = auth.uid() OR seasons.athlete_id = auth.uid())
    )
  );

CREATE POLICY "Coaches can manage mesocycles" ON mesocycles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM macrocycles
      JOIN seasons ON seasons.id = macrocycles.season_id
      WHERE macrocycles.id = mesocycles.macrocycle_id
      AND seasons.coach_id = auth.uid()
    )
  );

-- Policies for Microcycles (Cascade from Mesocycle)
CREATE POLICY "Users can view microcycles if they can view the mesocycle" ON microcycles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM mesocycles
      JOIN macrocycles ON macrocycles.id = mesocycles.macrocycle_id
      JOIN seasons ON seasons.id = macrocycles.season_id
      WHERE mesocycles.id = microcycles.mesocycle_id
      AND (seasons.coach_id = auth.uid() OR seasons.athlete_id = auth.uid())
    )
  );

CREATE POLICY "Coaches can manage microcycles" ON microcycles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM mesocycles
      JOIN macrocycles ON macrocycles.id = mesocycles.macrocycle_id
      JOIN seasons ON seasons.id = macrocycles.season_id
      WHERE mesocycles.id = microcycles.mesocycle_id
      AND seasons.coach_id = auth.uid()
    )
  );

-- Policies for Planned Sessions
CREATE POLICY "Users can view planned sessions if they can view the microcycle" ON planned_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM microcycles
      JOIN mesocycles ON mesocycles.id = microcycles.mesocycle_id
      JOIN macrocycles ON macrocycles.id = mesocycles.macrocycle_id
      JOIN seasons ON seasons.id = macrocycles.season_id
      WHERE microcycles.id = planned_sessions.microcycle_id
      AND (seasons.coach_id = auth.uid() OR seasons.athlete_id = auth.uid())
    )
  );

CREATE POLICY "Coaches can manage planned sessions" ON planned_sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM microcycles
      JOIN mesocycles ON mesocycles.id = microcycles.mesocycle_id
      JOIN macrocycles ON macrocycles.id = mesocycles.macrocycle_id
      JOIN seasons ON seasons.id = macrocycles.season_id
      WHERE microcycles.id = planned_sessions.microcycle_id
      AND seasons.coach_id = auth.uid()
    )
  );

-- Policies for Exercises
CREATE POLICY "Exercises are viewable by everyone (Public Library)" ON exercises
  FOR SELECT USING (true);

CREATE POLICY "Only Coaches/Admins can insert exercises" ON exercises
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('coach', 'admin'))
  );

-- Policies for Performed Sessions (Logs)
CREATE POLICY "Athletes can manage their own logs" ON performed_sessions
  FOR ALL USING (auth.uid() = athlete_id);

CREATE POLICY "Coaches can view logs of their athletes" ON performed_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM seasons
      WHERE seasons.athlete_id = performed_sessions.athlete_id
      AND seasons.coach_id = auth.uid()
    )
  );

-- Policies for Performed Sets
CREATE POLICY "Athletes can manage their own sets" ON performed_sets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM performed_sessions WHERE id = performed_sets.performed_session_id AND athlete_id = auth.uid())
  );

CREATE POLICY "Coaches can view sets of their athletes" ON performed_sets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM performed_sessions
      JOIN seasons ON seasons.athlete_id = performed_sessions.athlete_id
      WHERE performed_sessions.id = performed_sets.performed_session_id
      AND seasons.coach_id = auth.uid()
    )
  );
