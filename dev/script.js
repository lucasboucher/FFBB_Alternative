// |-------------------|
// |   Développement   |
// |-------------------|

fetch('../scrapper/data.json')
    .then((response) => response.json())
    .then((data) => {

        teams = data.equipes // Toutes les équipes

        // Détermination de la journée actuelle
        for (team in teams) {
            fixtures = teams[team].rencontres
            for (fixture in fixtures) {
                fixture = fixtures[fixture]
                next_matchday = fixture.jour
                if (!fixture.match_joue) {
                    break
                }
            }
        }

        // Affichage journée
        document.getElementsByClassName('pool-name')[0].innerHTML += ` ${next_matchday-2}`
        console.log(document.getElementsByClassName('pool-name'))

        // Précédent classement
        ranking = []
        for (team in teams) {
            team = teams[team]
            club_id = team.club
            fixtures = team.rencontres
            team_points = 0
            team_difference = 0
            match_counter = 1
            for (fixture in fixtures) {
                if (match_counter > next_matchday-2) {
                    break
                }
                fixture = fixtures[fixture]
                if (fixture.match_joue) {
                    if (fixture.match_domicile) {
                        team_score = fixture.resultat_equipe_domicile
                        opponent_score = fixture.resultat_equipe_exterieur
                    } else {
                        team_score = fixture.resultat_equipe_exterieur
                        opponent_score = fixture.resultat_equipe_domicile
                    }
                    team_score = parseInt(team_score)
                    opponent_score = parseInt(opponent_score)
                    if (team_score > opponent_score) {
                        team_points += 2
                    } else {
                        team_points += 1
                    }
                    team_difference += team_score - opponent_score
                    match_counter++
                }
            }
            team_points = team_points * 10000 + team_difference
            ranking.push([club_id, team_points])
        }
        ranking.sort((a, b) => b[1] - a[1])

        // Affichage du classement précédent 
        for (team in ranking) {
            console.log()
            document.getElementById("former_ranking").innerHTML +=
            `
            <li class="team">
                <a href="#">
                    <div class="rank">${parseInt(team) + 1}</div>
                    <div class="team-icon">
                        <svg width="8" height="8" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" stroke="rgb(184, 184, 184)" stroke-width="16"/></svg>
                    </div>
                    <div class="team-name">
                        <div class="team-club">${ranking[team][0]}</div>
                        <div class="team-number">0</div>
                    </div>
                    <div>0</div>
                    <div class="hide-mobile">0</div>
                    <div class="hide-mobile">0</div>
                    <div class="hide-mobile">0</div>
                    <div></div>
                    <div class="points">${ranking[team][1]}</div>  
                </a>
            </li>
            `
        }

    })
